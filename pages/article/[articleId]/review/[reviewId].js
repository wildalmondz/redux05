import { useRouter } from 'next/router';

function ArticleDetail() {
    const router = useRouter();
    const { articleId, reviewId } = router.query;

    return <h1>Review {reviewId} for article {articleId}</h1>
}

export default ArticleDetail;