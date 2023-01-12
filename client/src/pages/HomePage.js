import React, { useEffect } from 'react';
import {
	Box,
	Container,
	Grid,
	GridItem,
	Text,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from '@chakra-ui/react';
import Login from '../components/Login';
import Register from '../components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			navigate('/chats');
		}
	}, [navigate]);

	return (
		<Grid
			className='home_container'
			templateRows='1fr'
			templateColumns='repeat(6, 1fr)'
			height='100vh'
			width='100vw'
		>
			<GridItem colSpan={12} bg='#fff' minW={'500px'}>
				<Container maxW='xl' centerContent>
					<Box
						display='flex'
						justifyContent='center'
						alignContent='center'
						p='3'
						bg='#fff'
						mt='2em'
					>
						<Box display='flex' flexDir='column' alignItems='center'>
							<Text fontSize='4xl' fontWeight='bold'>
								Chat App
							</Text>
							<Text fontSize='lg'>Assessment 4</Text>
						</Box>
					</Box>
					<Box w='100%' p='4' mt='20px'>
						<Tabs isFitted variant='enclosed'>
							<TabList mb='1em'>
								<Tab>Login</Tab>
								<Tab>Sign Up</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<Login />
								</TabPanel>
								<TabPanel>
									<Register />
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</Container>
			</GridItem>
			<ToastContainer theme='colored' />
		</Grid>
	);
};

export default Homepage;
