import { Request, Response } from 'express';
import { ContactRequest } from '../interfaces/contact.interfaces';
import {
  createContactService,
  deleteContactService,
  listAllContactsService,
  retriveContactService,
  updateContactService,
} from '../services';

export const createContactController = async (req: Request, res: Response) => {
  const newContactData: ContactRequest = req.body;
  const data = await createContactService(
    newContactData,
    req.headers.authorization
  );

  return res.status(201).json(data);
};

export const listAllContactsController = async (
  req: Request,
  res: Response
) => {
  const contactsList = await listAllContactsService(req.headers.authorization);

  return res.status(200).json(contactsList);
};

export const retriveContactController = async (req: Request, res: Response) => {
  const contact = await retriveContactService(req.params.id);

  return res.status(200).json(contact);
};

export const updateContactController = async (req: Request, res: Response) => {
  const newData = req.body;
  const updatedContact = await updateContactService(newData, req.params.id);

  return res.status(200).json(updatedContact);
};

export const deleteContactController = async (req: Request, res: Response) => {
  await deleteContactService(req.params.id);

  return res.status(204).json({});
};
