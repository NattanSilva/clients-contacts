import { AppError } from '../../errors/AppError';
import contactRepository from '../../repositories/contact.repository';

export const deleteContactService = async (
  contactId: string
): Promise<void> => {

  const contactToDelete = await contactRepository.findOneBy({
    id: contactId,
  });

  if(!contactToDelete) {
    throw new AppError('Invalid contact ID', 404)
  }

  await contactRepository.delete({
    id: contactId
  })
};
