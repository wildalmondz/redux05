import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './stylesheet/BlogDashboard.scss';
import { withRouter } from 'react-router';
import { MessageBoardId} from '../main/lib/containers.js';
// import { NewsLetterId } from '../Home/lib/containers.js';
import InviteBlogList from './InviteBlogList.jsx';
import VideoPageList from './VideoPageList.jsx';
import fixDate from '../../../lib/fixDate.js';
import findBlogs from '../../../lib/findBlogs.js';
import {FacebookButton, TwitterButton} from '../main/lib/SocialShare.jsx';
import slugToGameId from '../../../lib/slugToGameId.js';

// https://stackoverflow.com/questions/40352310/how-do-you-mix-componentdidmount-with-react-redux-connect
// https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html (replace componentWillMount)
// https://codeat21.com/react-wysiwyg-text-editor/

function PrevBlog(props) {
	return (
		<button className={'button5'} onClick={props.toggle} disabled={props.active}>
			<img src={'https://wildalmonds.com/api/uploads/37453669-cb2a-48c2-9f73-253002cb55f2_3017916_antecedent_arrow_earlier_fill_left_icon 2.png'}/>
		</button>
	);
}

function NextBlog(props) {
	return (
		<button className={'buttonNext'} onClick={props.toggle} disabled={props.active}>
			<img id='nextArrow' src={'https://wildalmonds.com/api/uploads/8b8c73df-c593-4a8f-ad60-305bce132bc2_antecedent_arrow_next.png'}
				width="42"
				height="42" />
		</button>
	);
}

function PrevCo(props) {
	return (
		<button className={'button5'} onClick={props.toggle} disabled={props.active}>
			<img src={'https://wildalmonds.com/api/uploads/37453669-cb2a-48c2-9f73-253002cb55f2_3017916_antecedent_arrow_earlier_fill_left_icon 2.png'}/>
		</button>
	);
}

function NextCo(props) {
	return (
		<button className={'button5'} onClick={props.toggle} disabled={props.active}>
			<img id='nextArrow' src={'https://wildalmonds.com/api/uploads/8b8c73df-c593-4a8f-ad60-305bce132bc2_antecedent_arrow_next.png'}/>
		</button>
	);
}

function BlogEntry(props) {
	const prettyDate = fixDate(props.createdAt, true);
	return (
		<div id='blog-segment'>
			<div id='blog-top'>
				<div id='blog-header'>
					<div id='blog-title' style={{fontSize: '2em'}}><strong>{props.title}</strong></div>
					<div id='blog-author'><strong>By: </strong><strong> {props.firstname} {props.lastname}</strong></div>
					<div id='blog-date'>{prettyDate}</div>
				</div>
			</div>
			<div id='blog-text'>
				<article id='blog-reader'>
					<div id='blog-html' dangerouslySetInnerHTML={{ __html: props.blog }}/>
				</article>
			</div>
		</div>
	);
}

class BlogDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blogIndex: 0,
			companyIndex: 0,
			disabledCompanyNext: false,
			disabledCompanyPrev: true,
			disabledBlogNext: false,
			disabledBlogPrev: true,
			type: this.props.match.params.type,
			slug: this.props.match.params.slugName,
			onFetch: this.props.onFetch,
			blog: 'Blog',
			count: 0,
			location: 'https://wildalmonds.com',
			message: 'WildAlmonds',
		};
	}

	componentDidMount() {
		this._asyncRequest = findBlogs(
			this.state.onFetch,
			this.state.type,
			this.state.slug
		);
		this._asyncRequest = slugToGameId(
			this.props.onFetchSlug,
			this.state.slug
		);
	}

	componentWillReceiveProps(props) {
		if(props.blogs[3]) {
			if (props.blogs[3].blogs.length <= 1) {
				// handle the condition if only one blog is present
				this.setState({ disabledBlogNext: true });
			}
			else {
				this.setState({ disabledBlogNext: false });
			}
		}
	}

	componentWillUnmount() {
		if (this._asyncRequest) { this._asyncRequest.cancel(); }
	}

	toggleNextCompany(event) {
		event.preventDefault();
		this.setState({ blogIndex: 0 });  // why set to 0 each time?
		let companyIndex;

		if (this.state.companyIndex !== 0) {  		// first time setting previous to false
			companyIndex = this.state.companyIndex + 1;
		}

		if (this.state.companyIndex !== this.props.blogs[4].slugs.length) {
			companyIndex = this.state.companyIndex + 1;
		}

		let type= this.props.blogs[4].slugs[companyIndex].type;
		let slug= this.props.blogs[4].slugs[companyIndex].slug;
		let disabledCompanyNext = companyIndex === (this.props.blogs[4].slugs.length - 1);

		this._asyncRequest = findBlogs(
			this.state.onFetch,
			type,
			slug
		).then((response) => {
			let tempVar = response;
			this._asyncRequest = slugToGameId(
				this.props.onFetchSlug,
				this.state.slug
			);
		})
			.catch((error) => {
				console.log(error);
			});
		if((this.state.companyIndex) === (this.props.blogs[4].slugs.length - 1)) {
			this.props.history.push(`/blog/${this.props.blogs[4].slugs[(companyIndex - 1)].type}/${this.props.blogs[4].slugs[(companyIndex - 1)].slug}`);
		}
		else {
			this.props.history.push(`/blog/${this.props.blogs[4].slugs[companyIndex].type}/${this.props.blogs[4].slugs[(companyIndex)].slug}`);
		}
		// reset the blog status?
		this.setState({
			blogIndex: 0,
			disabledBlogPrev: true,
			disabledBlogNext: true,
			companyIndex: companyIndex,
			disabledCompanyNext: disabledCompanyNext,
			disabledCompanyPrev: false,
			slug: slug,
			type: type,
		});
	}

	togglePrevCompany(event) {
		event.preventDefault();
		let companyIndex;
		if (this.state.companyIndex !== 0) {
			companyIndex = this.state.companyIndex - 1;
		}

		let type= this.props.blogs[4].slugs[companyIndex].type;
		let slug= this.props.blogs[4].slugs[companyIndex].slug;

		let disabledPrev = (companyIndex === 0);

		this.setState({
			blogIndex: 0,
			disabledBlogPrev: true,
			disabledBlogNext: true,
			companyIndex: companyIndex,
			disabledCompanyNext: false,
			disabledCompanyPrev: disabledPrev,
			slug: slug,
			type: type,
		});

		this._asyncRequest = findBlogs(
			this.state.onFetch,
			type,
			slug
		).then((response) => {
			let tempVar = response;
			this._asyncRequest = slugToGameId(
				this.props.onFetchSlug,
				this.state.slug
			);
		}).catch((error) => {
			console.log(error);
		});
		this.props.history.push(`/blog/${type}/${slug}`);
	}

	togglePrev(event) {
		event.preventDefault();
		let blogIndex = this.state.blogIndex - 1;
		let disabledBlogPrev = (blogIndex === 0);

		this.setState({
			blogIndex: blogIndex,
			disabledBlogPrev: disabledBlogPrev,
			disabledBlogNext: false });
	}

	toggleNext(event) {
		event.preventDefault();
		let blogIndex = this.state.blogIndex + 1;
		let disabledBlogNext = blogIndex === (this.props.blogs[3].blogs.length - 1);

		this.setState({
			blogIndex: blogIndex, disabledBlogNext: disabledBlogNext, disabledBlogPrev: false });
	}

	render() {
		const {
			blogs,
			history,
		} = this.props;

		const {
			blogIndex,
			disabledBlogNext,
			disabledBlogPrev,
			disabledCompanyNext,
			disabledCompanyPrev
		} = this.state;

		let foundBlogs = null;
		let currentBlog = null;

		if ((blogs) && (blogs[3])) {
			foundBlogs = blogs[3];
			currentBlog = foundBlogs.blogs[blogIndex];
		}
		else {
			console.log('No blogs');
		}

		if (currentBlog) {
			return (
				<React.StrictMode>
					<div className='profile' style={{paddingTop: '.25em'}}></div>
					<div id='blog-page'>
						<section id="blog-details" style={{paddingTop: '0em'}}>
							<MessageBoardId />
							<section className='container-blogpath'>
								<div id='boxes'>
									{
										(blogs[0].company[0].image_path != null) ?
											<div id='squareonly'
												style={{
													backgroundColor: 'black',
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
													backgroundImage: 'linear-gradient(0deg, rgba(196, 196, 196, 0) 75%, rgba(196, 196, 196, 0) 0%, #000000 100%), ' +
                                                         `url("${blogs[0].company[0].image_path}")`}}
											>
												<div id='blogcontainer'>
													<div id='toppath'>
														{blogs[0].company[0].name ?
															<div id="blog-title">
																<h3>{blogs[0].company[0].name}</h3>
															</div>:
															''
														}
														<div id='direction-arrows'>
															<span id='prevCursor'>
																<PrevCo toggle={(event) => this.togglePrevCompany(event)}
																	active={disabledCompanyPrev} title={''} />
															</span>
															<span id='nextCursor'>
																<NextCo toggle={(event) => this.toggleNextCompany(event)}
																	active={disabledCompanyNext} title={''} />
															</span>
														</div>
													</div>
												</div>
											</div>
											:
											<div id='squareonly'
												style={{
													backgroundColor: 'black',
													backgroundPosition: 'center',
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
													backgroundImage: 'linear-gradient(0deg, rgba(196, 196, 196, 0) 75%, rgba(196, 196, 196, 0) 0%, #000000 100%), url("https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")'}}
											>
												<div id='blogcontainer'>
													<div id='toppath'>
														{blogs[0].company[0].name ?
															<div id="blog-title">
																<h3>{blogs[0].company[0].name}</h3>
															</div>:
															''
														}
														<div id='direction-arrows'>
															<span id='prevCursor'>
																<PrevCo toggle={(event) => this.togglePrevCompany(event)}
																	active={disabledCompanyPrev} title={''} />
															</span>
															<span id='nextCursor'>
																<NextCo toggle={(event) => this.toggleNextCompany(event)}
																	active={disabledCompanyNext} title={''} />
															</span>
														</div>
													</div>
												</div>
											</div>
									}
									<div id='squareonly'>
										{
											(blogs[5].videos.length === 0) ?
												<div id="noVideos"></div>
												:
												<VideoPageList videos={blogs[5].videos}/>
										}
									</div>
								</div>
							</section>
							<section className='container-blogtext'>
								<BlogEntry {...currentBlog} />
								<div style={{
									'width' : '95%',
									'margin': '0 auto',
									'position': 'fixed',
									'display': 'flex',
									'justifyContent': 'space-between',
									'top': '50%',
									'left': '50%',
									'transform': 'translate(-50%, -50%)',
									'pointerEvents': 'none',
								}}>
									<div id="toggleleft" >
										<span id='prevCursor'>
											<PrevBlog toggle={(event) => this.togglePrev(event)}
												active={disabledBlogPrev}
												title={'Blog'} />
										</span>
									</div>
									<div id="toggleright" >
										<span id='nextCursor'>
											<NextBlog toggle={(event) => this.toggleNext(event)}
												active={disabledBlogNext}
												title={'Blog'} />
										</span>
									</div>
								</div>
							</section>
							<section className='container-blogadditional'>
								<div id="blog-social">
									<FacebookButton
										quote={this.state.message}
										url={this.state.location}/>
									<TwitterButton
										quote={this.state.message}
										url={this.state.location}/>
								</div>
								<div id="blog-signup">
									<InviteBlogList
										slugIds={this.props.slugIds}
									/>
								</div>
							</section>
						</section>
					</div>
				</React.StrictMode>
			);
		} else {
			return (
				<div className='profile' style={{paddingTop: '5em', minHeight: '60em'}}>
					<MessageBoardId />
					<div style={{display: 'flex',  justifyContent: 'space-around', paddingTop: '2em'}}>
					</div>
				</div>
			);
		}
	}
}

BlogDashboard.propTypes = {
	blogs: PropTypes.array,
	slugIds: PropTypes.array,
	onFetch: PropTypes.func,
	onFetchSlug: PropTypes.func,
	onFetchUpdatedBlogs: PropTypes.func.isRequired,
};

BlogDashboard.defaultProps = {
	onFetch: f => f,
	onFetchSlug: f => f,
};

export default withRouter(BlogDashboard);