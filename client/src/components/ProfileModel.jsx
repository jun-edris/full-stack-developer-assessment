import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Divider,
	Image,
	Text,
} from '@chakra-ui/react';
import { IoEyeSharp } from 'react-icons/io5';

import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
const ProfileModel = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			{children ? (
				<span onClick={onOpen}>{children}</span>
			) : (
				<IconButton
					style={{ zIndex: 2 }}
					display={{ base: 'flex' }}
					icon={<IoEyeSharp />}
					onClick={onOpen}
				/>
			)}
			<Modal onClose={onClose} size='md' isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize='1.25rem'
						display='flex'
						justifyContent='center'
						textTransform='capitalize'
					>
						{user.name}
					</ModalHeader>
					<Divider />
					<ModalCloseButton />
					<ModalBody
						display='flex'
						flexDir='column'
						alignItems='center'
						justifyContent='space-between'
						bg='whiteAlpha.500'
						p='20px 0'
					>
						{user?.image && (
							<Image boxSize='150px' src={user.image} alt={user.name} />
						)}

						<Text mt='2rem' fontSize={{ base: '1rem', md: '1.25rem' }}>
							Email: {user.email}
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfileModel;
