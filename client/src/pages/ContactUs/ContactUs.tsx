import {useState} from 'react';
import {
  TextInput,
  Textarea,
  Select,
  Button,
  Paper,
  Group,
  Stack,
  Container,
  Title,
  Text,
} from '@mantine/core';
import { IconMail, IconPhone
 } from '@tabler/icons-react';
import Header from '../../components/Header/Header';
import './ContactUs.css'
import Crowdsource from '../../../public/Crowdsource.png'
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';

const ContactUs = () => {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    topic: '',
    message: '',
    bugDescription: '',
    timeEncountered: '',
    dateEncountered: '',
  });

    const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch(
      "https://johnbackend-gc3krz6ly-csis-projects-620122e0.vercel.app/api/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    // Show Ethereal preview link
    alert(`Message sent!\nPreview URL: ${data.previewURL}`);
    console.log("Preview URL:", data.previewURL);
        setFormData({
      name: '',
      company: '',
      email: '',
      topic: '',
      message: '',
      bugDescription: '',
      timeEncountered: '',
      dateEncountered: '',});
  } catch (err) {
    alert("Failed to send email. Check server logs.");
    console.error(err);
  }
};


  const handleBack  = () => {
    navigate ("/dashboard")
  }

    const isBugTopic = formData.topic === 'bug';

    return ( 
        <>
    <Header title='Contact Us'/> 
        <div className='ContactUsBG'>
        <Container className='ContactUsContainer'>
           
        <Container className='ContactUsHeader'>
            <Text> Got A Question? </Text>
            <Title> CONTACT US </Title>
            <Text className='ContactUsDescription' >  We are here to help and answer any questions you might have. </Text>
            <Button className='DashboardBtn' onClick={handleBack}>Back to Dashboard</Button>

        </Container>
        <Container className='ContactUsCard'>
            <Container className='ContactUsForm'>
                  <form onSubmit={handleSubmit}>
              <Stack >
                 <Title order={3}> Inquiry Form </Title>
                <TextInput
                  label="Name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.currentTarget.value)}
                />
                <TextInput
                  label="Company"
                  placeholder="Your Company"
                  required
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.currentTarget.value)}
                />
                <TextInput
                  label="Email"
                  placeholder="Your Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.currentTarget.value)}
                />
                <Select
                  label="Topic"
                  placeholder="Select a topic"
                  data={[
                    { value: 'general', label: 'General Inquiry' },
                    { value: 'bug', label: 'Bug Report' },
                  ]}
                  required
                  value={formData.topic}
                  onChange={(value) => handleChange('topic', value || '')}
                />

                {isBugTopic && (
                  <div className="bug-fields">
                    <TextInput
                      label="Bug Description"
                      placeholder="Describe the bug"
                      required
                      value={formData.bugDescription}
                      onChange={(e) => handleChange('bugDescription', e.currentTarget.value)}
                    />
                    <TextInput
                      label="Time Encountered"
                      placeholder="HH:MM"
                      required
                      value={formData.timeEncountered}
                      onChange={(e) => handleChange('timeEncountered', e.currentTarget.value)}
                    />
                    <TextInput
                      label="Date Encountered"
                      placeholder="YYYY-MM-DD"
                      required
                      value={formData.dateEncountered}
                      onChange={(e) => handleChange('dateEncountered', e.currentTarget.value)}
                    />
                  </div>
                )}

                <Textarea
                  label="Message "
                  placeholder="Type your message here"
                  required
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.currentTarget.value)}
                />
                <Button type="submit" fullWidth>
                  Submit
                </Button>
              </Stack>
            </form>
            </Container>

            <Container className=' ContactUsInfo' >

             <img src={Crowdsource} alt="Crowdsource Logo" style={{ maxWidth: 200, marginBottom: 50, marginLeft: 50  }} />
            <Group className='ContactUsInfoDetails' >
            <Title order={5}>How Can We Help?</Title>
            <Text size="sm" mb="md">
              Please fill out the form, and a member of our team will get in touch with you shortly regarding your inquiry.
            </Text>
            <Title order={6} >For immediate inquiries:</Title>
            <Text size="13px" className='ContactUsInfoDetails' ><IconMail size={16}/> SAMPLE@CROWDSOURCESOLUTIONS.PH</Text>
            <Text size="sm" > <IconPhone size={16}/> (02) 1234 5678</Text>
            </Group>
            </Container>

        </Container>

        </Container>
        </div>
</>
    )
}
    export default ContactUs;