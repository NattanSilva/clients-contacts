import AppDataSource from '../data-source';
import Contact from '../entities/contact.entity';

const contactRepository = AppDataSource.getRepository(Contact);

export default contactRepository;
