import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { Contact, ContactRequest } from '../../interfaces/contact.interfaces';
import contactRepository from '../../repositories/contact.repository';
import userRepository from '../../repositories/user.repository';
import { contactSchema } from '../../serializers/contact.serializer';

export const createContactService = async (
  newContactData: ContactRequest,
  auth: string
): Promise<Contact> => {
  const token = auth.split(' ')[1];
  const userId = jwt.decode(token)?.sub;

  const currentUser = await userRepository.findOneBy({
    id: userId as string,
  });

  const currentContact = await contactRepository.findOne({
    where: {
      ...newContactData,
    },
  });

  if (currentContact) {
    throw new AppError('Contatc already exists', 409);
  }

  const createdContact = contactRepository.create({
    ...newContactData,
    owner: currentUser,
  });

  await contactRepository.save(createdContact);

  return contactSchema.parse(createdContact);
};
