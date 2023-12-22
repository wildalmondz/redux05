import Link from 'next/link';
import Layout from '../../components/Layout';
import { blogHandler } from '../../pages/api';
import { styled } from '@mui/material/styles';
import styles from '../../styles/Blog.module.scss'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const OverlayText = styled('h3')({
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black', // Text color
    zIndex: 1, // Ensure text appears above the image
});

const StyledItem = styled('div')({
    height: '100%', // Adjust as needed
    border: '1px solid #000', // Example border for visualization
    position: 'relative',
});

const BackgroundImage = styled('div')({
    backgroundImage: `url('https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
});


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    height: '15em',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid #000', // Example border for visualization
}));

const BlogItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid #000', // Example border for visualization
}));

const Slugs = ({ companyDetails, slugListArray, blogListArray }) => {
    console.log(companyDetails);
    const companyInfo = companyDetails.company[0];

    return (
        <Layout>
            {/* Blog display section */}
            <section style={{ padding: '.5em' }}>
                <div>
                    <Box sx={{
                        flexGrow: 1,
                        height: '10em'
                    }}>
                        <Grid container spacing={0}>
                            <Grid xs>
                                <StyledItem>
                                    <BackgroundImage />
                                    <OverlayText>{companyInfo.name}</OverlayText>
                                </StyledItem>
                            </Grid>
                            <Grid xs>
                                <Item>xs</Item>
                            </Grid>
                        </Grid>
                        <Grid xs>
                            <Item sx={{
                                color: 'white',
                                backgroundImage: 'url(https://wildalmonds.com/api/uploads/725c78bb-ae08-4ed7-93cb-3fb6becd7d04_subtle-dots.png)',
                                paddingTop: '0.5em',
                                paddingBottom: '0.5em',
                                backgroundColor: '#17355B',
                                height: '100%',
                                width: '100%',
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'space-around',
                            }}>xs</Item>
                        </Grid>
                        <Grid xs>
                            <Item sx={{
                                backgroundImage: 'url(https://wildalmonds.com/api/uploads/725c78bb-ae08-4ed7-93cb-3fb6becd7d04_subtle-dots.png)',
                                paddingTop: '0.5em',
                                paddingBottom: '0.5em',
                                backgroundColor: 'white',
                                height: '100%',
                                width: '100%',
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'space-around',
                            }}>xs</Item>
                        </Grid>
                    </Box>
                </div>
                <div style={{ borderTop: '1px solid #000', margin: '3em 0' }} />
                <div>
                    {/*  */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid xs={6}>
                            <BlogItem sx={{
                                overflow: 'auto',  // Add overflow property for scrolling if content exceeds the box
                                whiteSpace: 'pre-wrap',  // Allow wrapping of long lines
                                wordBreak: 'break-word',  // Break words to prevent overflow
                                textAlign: 'justify',  // Justify text for a cleaner look
                                lineHeight: '1.5',  // Set line height for better readability
                            }}>

                                <article style="
    background-color: whitesmoke;
    height: 100%;
    font-size: 18px;
    color: #333; ">
                                <br/>
                                <figure class="align-center">
                                    <img
                                        style="height: 100%; width: 100%"
                                        src="https://wildalmonds.com/api/uploads/a08a5dae-42dc-4dd6-8492-500ae013e7ce_Leavenworth.png"
                                        alt="leavenworth" />
                                        <figcaption class="blogFig">Leavenworth, WA</figcaption>
                                </figure>
                            <br/>
                            <p>
                                Nestled in the Cascade Mountains, Leavenworth is a picturesque Bavarian-themed village that offers
                                a unique blend of natural beauty and cultural charm. Known for its quaint architecture, Leavenworth transports
                                visitors to the heart of Bavaria, with cobblestone streets, alpine-style buildings, and a year-round calendar of
                                festivals, including the famous Oktoberfest.
                                <br />
                                <br />
                                Beyond its Bavarian aesthetic, the town is an outdoor enthusiast\'s
                                paradise, offering access to hiking, skiing, and river activities in the stunning surrounding landscapes. With a
                                welcoming atmosphere, boutique shops, delicious German cuisine, and a plethora of other adventures including an
                                <a href="https://www.leavenworthadventurepark.com/">apline rollercoaster</a>. Leavenworth is a year-round
                                destination that combines the best of European culture and Pacific Northwest beauty.
                            </p>
                            <figure class="align-left">
                                <img
                                    class="portrait"
                                    src="https://wildalmonds.com/api/uploads/37cc22dd-f81f-40e4-aa02-a9f88194b247_hardRowLeavenworth.jpg"
                                    alt="Hard Row to Hoe"/>
                                    <figcaption class="blogFig">Hard Row to Hoe</figcaption>
                            </figure>
                            <p>
                                Once a struggling logging and railway town, by fully
                                embracing its stunning alpine surroundings and adopting a Bavarian architectural theme. This extraordinary
                                makeover was driven by local business leaders, who aimed to revitalize the town\'s economy.
                            </p>
                            <p>
                                The transformation
                                involved architectural changes and hosting year-round Bavarian-themed festivals and
                                events. Now this town attracts visitors seeking a unique blend of outdoor recreation, authentic
                                German cuisine, and a picturesque alpine ambiance.
                            </p>
                            <section>
                                <div class="separator">
                                    <h2>Wines of Germany</h2>
                                </div>
                                <p>
                                    <a href="">Germany\'s wine regions</a> offer a diverse and captivating
                                    tapestry of terroirs and wine styles. Spanning 13 distinct areas, from the famous Mosel and Rheingau to
                                    the lesser-known Franconia and Baden, each region showcases a unique combination of grape varieties,
                                    topography, and microclimates.
                                    <br />
                                    <br />
                                    Germany\'s wine culture is deeply rooted in tradition, and its reputation
                                    for exceptional Rieslings is well-earned, with the terroir-driven, high-acid white wines from the steep
                                    slopes of the Mosel being particularly celebrated. Additionally, the country\'s wine producers have been
                                    embracing sustainability and innovation, making it an exciting destination for wine enthusiasts looking
                                    to explore both classic and cutting-edge expressions of German winemaking.
                                </p>
                            </section>
                            <section>
                                <br />
                                <br />
                                <div class="separator">
                                    <h2>Taste of Germany close to home</h2>
                                </div>
                                <figure class="align-right">
                                    <img
                                        class="portrait"
                                        src="https://wildalmonds.com/api/uploads/3d945c5b-f8f7-4f79-aaac-843f6b9f3ca2_icicleRidgeFire.jpg"
                                        alt="Icicle Ridge" />
                                        <figcaption class="blogFig">Icicle Ridge</figcaption>
                                </figure>
                                <p>
                                    In recent years, Leavenworth, Washington, has witnessed a notable shift in its culinary and recreational
                                    landscape with a growing emphasis on wine tasting alongside its well-established beer scene. While the town\'s
                                    Bavarian-inspired breweries remain popular, a surge in boutique wineries has taken root, introducing locals and
                                    tourists to the joys of wine appreciation.
                                    <br />
                                    <br />
                                    The Cascade foothills\' fertile terroir has proven conducive to grape
                                    cultivation, and a slew of vineyards now produce a diverse array of varietals. This wine renaissance complements
                                    Leavenworth\'s reputation as a culinary destination, offering visitors a chance to savor both world-class beer
                                    and locally-produced wines amidst the picturesque alpine backdrop, further cementing Leavenworth\'s status as a
                                    multifaceted hub for libation enthusiasts.
                                </p>
                            <br />
                        <br />
                        <section>
                            <div class="separator">
                                <h2>Get your own Leavenworth collection below!</h2>
                            </div>
                        <br />
                        <figure class="align-center">
                            <img
                                style="height: 100%; width: 100%"
                                src="https://wildalmonds.com/api/uploads/94e4e097-5480-4fcc-86e1-41e789b1d867_leavenworthRegion.png"
                                alt="leavenworth" />
                                <figcaption class="blogFig">Leavenworth WildAlmonds</figcaption>
                        </figure>
            </section>
        </section>
    <br />
    <br />
    <section style="
    padding-top: 2em;">
        <div class="separator"><h2>Plan your trip!</h2></div>
        <p>
            Once you have signed up below to discover and note your wine tasting experiences in Leavenworth, check out these
            links for your hotel stays.
            <ul>
                <li>
                    <a href="https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiI_LGN4JeCAxXvGq0GHYEhBJcYABACGgJwdg&ase=2&gclid=CjwKCAjwv-2pBhB-EiwAtsQZFApW0fj3vucSWidViFyG7gg-V_l7YWS9F3ALfS8jOhCjyYXxsrevoBoCaO0QAvD_BwE&ei=SXk8ZcLCAs2S0PEPqMOCwAM&ohost=www.google.com&cid=CAESVeD2Iwzo0i5-owTHwSsJLthoJS5DAtvaaFuhTDlX453aD5w8OJIsCvSb5yQbq7zHypvclSYS5RPlyRe7QCjF58Lwn2fSROn8gA-_v0VloFnMA4h3HHs&sig=AOD64_01ouYQh1kgLR_k5BOdMCMTH7-H-g&q&sqi=2&nis=4&adurl&ved=2ahUKEwiCi6uN4JeCAxVNCTQIHaihADgQ0Qx6BAgHEAM"/>Reservations</a>
            </li>
            <li>
                <a href="https://www.expedia.com/Hotel-Search?destination=Leavenworth%2C%20Washington%2C%20United%20States%20of%20America&endDate=2023-11-11&gclid=CjwKCAjwv-2pBhB-EiwAtsQZFIZKQuHWwuR-rfjXlwYr3T1Lmy02PY9nXD1_oQOYwxPK9y48KhJz-xoCnFEQAvD_BwE&locale=en_US&regionId=10786&semcid=US.B.GOOGLE.BD-c-EN.HOTEL&semdtl=a118936609802.b1147711311167.g1kwd-309356970639.e1c.m1CjwKCAjwv-2pBhB-EiwAtsQZFIZKQuHWwuR-rfjXlwYr3T1Lmy02PY9nXD1_oQOYwxPK9y48KhJz-xoCnFEQAvD_BwE.r1325ac91cf80b82a7690479db632a2b626193b67f27670d246e79292addee0636.c1ig00AUIe99OVlkiGtSWFxQ.j19033260.k1.d1640929537786.h1e.i1.l1.n1.o1.p1.q1.s1.t1.x1.f1.u1.v1.w1&siteid=1&sort=RECOMMENDED&startDate=2023-11-10&theme=&useRewards=false&userIntent="/>Expedia</a>
        </li>
        <li>
            <a href="https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiI_LGN4JeCAxXvGq0GHYEhBJcYABAAGgJwdg&ase=2&gclid=CjwKCAjwv-2pBhB-EiwAtsQZFOxyHAH_M60j5MfJBspzU4xA3-KZE3wMp5heL6BaaKV315RwcnG7qhoC3LsQAvD_BwE&ei=SXk8ZcLCAs2S0PEPqMOCwAM&ohost=www.google.com&cid=CAESVeD2Iwzo0i5-owTHwSsJLthoJS5DAtvaaFuhTDlX453aD5w8OJIsCvSb5yQbq7zHypvclSYS5RPlyRe7QCjF58Lwn2fSROn8gA-_v0VloFnMA4h3HHs&sig=AOD64_0cyoB3iOw4cI1z2YRFiZ7GVN92Ew&q&sqi=2&nis=4&adurl&ved=2ahUKEwiCi6uN4JeCAxVNCTQIHaihADgQ0Qx6BAgJEAE"/>Priceline</a>
    </li>
    <li>
        <a href="https://www.airbnb.com/a/stays/Leavenworth--Washington--United-States?mlamenities=true&c=.pi0.pk475441696_41645805105&localized_ghost=true&gclid=CjwKCAjwv-2pBhB-EiwAtsQZFFVfbUFvYXoa4ggcWs-hW97BQIvZV9sMiQanWPX9MtlKyZfl8SBRaRoCkiwQAvD_BwE"/>Air B&B</a>
</li>
</ul>
</p>
</br>
</br>
</br>
</section>
</article>
                            </BlogItem>
                        </Grid>
                    </Box>
                </div>
            </section>
            <section className={styles.containerBlogpath}>
                <div className={styles.boxes}>
                    <div className={styles.squareonly}
                         style={{
                        backgroundColor: 'black',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: 'linear-gradient(0deg, rgba(196, 196, 196, 0) 75%, rgba(196, 196, 196, 0) 0%, #000000 100%), ' +
                            `url("https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"`}}>
                        <div className={styles.blogcontainer}>
                            <div className={styles.toppath}>
                                    <div className="blog-title">
                                        <h3 className="blog-title">{companyInfo.name}</h3>
                                    </div>
                            </div>
                        </div>

                    </div>
                    <div id={styles.squareonly}>
                    </div>
                </div>
            </section>
            <h1 style={{ color: 'black', fontSize: '2em', margin: '.6em' }}>Name: {companyInfo.name}</h1>
            <h4 style={{ color: 'black', fontSize: '1em', margin: '.6em' }}>type: {companyInfo.type}</h4>
            <h4 style={{ color: 'black', fontSize: '1em', margin: '.6em' }}>slug: {companyInfo.slug}</h4>

                <ul style={{ listStyle: 'none', padding: '0' }}>
                    {slugListArray.slugs.map((slugValue) => (
                        <li key={slugValue.id} style={{ margin: '10px 0', fontSize: 'smaller' }}>
                            <Link href={`slugs/${slugValue.id}`} passHref style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                                {slugValue.slug}
                            </Link>
                        </li>
                    ))}
                </ul>
            <br />

            <ul style={{ listStyle: 'none', padding: '0' }}>
                {blogListArray.blogs.map((blogValue) => (
                    <li key={blogValue.id} style={{ margin: '10px 0', fontSize: 'smaller' }}>
                        <Link
                            href={`/blogs/[type]/[slug]/[id]`}
                            as={`/blogs/${companyInfo.type}/${companyInfo.slug}/${blogValue.id}`}
                            passHref
                            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                        >{blogValue.title}
                        </Link>
                    </li>
                ))}
            </ul>

        </Layout>
    );
};

export async function getStaticProps() {
    let companyDetails = {};
    let slugListArray = {};
    let blogListArray = {};

    try {
        console.log(`Here at blogData`);
        const blogData = await blogHandler(`http://localhost:4500/blog/v2/fastfood/chicken`);

        companyDetails = blogData.find((entry) => entry.company);
        slugListArray = blogData.find((entry) => entry.slugs);
        blogListArray = blogData.find((entry) => entry.blogs);
    } catch (error) {
        console.error('Error fetching blog data:', error.message);
    }

    return {
        props: {
            companyDetails,
            slugListArray,
            blogListArray,
        },
    };
}

export default Slugs;
