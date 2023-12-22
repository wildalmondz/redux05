import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import contacts from "../api/contacts";

export default function Contact() {
    const router = useRouter();
    const { contactId } = router.query;

    // Find the contact with the matching ID
    const contact = contacts.find((contact) => contact.id === String(contactId));

    // Check if the contact is not found
    if (!contact) {
        return (
            <Layout>
                <p>Contact not found</p>
            </Layout>
        );
    }

    const [first, last] = contact.name.split(" ");

    return (
        <Layout>
            <a href="#" onClick={() => router.back()}>
                Back
            </a>
            <h2>Contact {last.toUpperCase()}, {first}</h2>
        </Layout>
    );
}
