import { useRouter } from 'next/router';

function ArticleDetail() {
    const router = useRouter();
    const articleId = router.query.articleId;
    return <h1>Details about Article {articleId}</h1>
}

export default ArticleDetail;