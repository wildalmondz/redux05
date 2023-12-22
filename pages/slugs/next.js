import Layout from "../../components/Layout";

export default function Contacts(){
    return(
        <Layout>
            <ul>
                {contacts.map(contact => {
                    return(
                        <li>
                            <Link href={`contacts/${contact.id}`}>
                                {contact.name}
                            </Link>
                        </li>)
                })}
            </ul>
        </Layout>
    )
}