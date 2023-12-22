// pages/api/test.js
import { blogHandler } from "../../pages/api";

export default async function handler(req, res) {
    try {
        const blogData = await blogHandler('http://localhost:4500/v4/:companyType/:companyName');
        res.status(200).json(blogData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/*
export default async function handler01(req, res) {
    try {
        const blogData = await blogHandler('http://localhost:4500/blog/testid');
        res.status(200).json(blogData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

 */

