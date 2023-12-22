import Link from 'next/link';
import contacts from "../api/contacts"
import Layout from "../../components/Layout";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function Contacts(){
    return(
        <Layout>
        <List>
            {contacts.map(contact => {
                return(
                    <ListItem>
                        <Link href={`contacts/${contact.id}`}>
                            {contact.name}
                        </Link>
                    </ListItem>)
            })}
        </List>
        </Layout>
    )
}