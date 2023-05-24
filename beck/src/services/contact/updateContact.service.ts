import { AppError } from '../../errors/AppError';
import { ContactUpdateRequest } from '../../interfaces/contact.interfaces';
import { User } from '../../interfaces/user.interfaces';
import contactRepository from '../../repositories/contact.repository';
import { contactSchema } from '../../serializers/contact.serializer';

export const updateContactService = async (
  newData: ContactUpdateRequest,
  contactId: string
): Promise<User> => {
  const currentContact = await contactRepository.findOne({
    where: {
      id: contactId,
    },
    relations: {
      owner: true,
    },
  });

  if (!currentContact) {
    throw new AppError('Invalid contact ID', 404);
  }

  const updatedContact = contactRepository.create({
    ...currentContact,
    ...newData,
  });

  await contactRepository.save(updatedContact);

  return contactSchema.parse(updatedContact);
};
