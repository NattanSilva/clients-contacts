import contactRepository from '../../repositories/contact.repository';

export const retriveContactService = async (contactId: string) => {
  const contact = await contactRepository.findOne({
    where: {
      id: contactId,
    },
    relations: {
      owner: true,
    },
  });

  return contact;
};
