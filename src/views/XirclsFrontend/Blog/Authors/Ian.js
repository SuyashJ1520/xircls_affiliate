import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Calendar, Mail } from 'react-feather'
import { Link } from 'react-router-dom'
import { SiLinkedin } from 'react-icons/si'
import Footer from '../../base/Footer'
import { blogs } from '../../../../Helper/data'

const Ian = () => {
    return (
        <div className='products'>
            
            <Container className='px-md-3'>
                <Row className='my-2 my-md-5 py-md-4 font-two'>
                    <Col lg={3}>
                        <Link to='/'>
                            <img className='rounded-circle' src={'https://api.xircls.com/static/images/website-slide/blog/a8.jpg'} width={250} height={250} />
                        </Link>
                        <div className='d-flex align-items-center justify-content-start mt-2'>
                            <span className='sixth-font-blog fw-light icon-gap-small'>Follow on: </span>
                            <Link to='/'>
                                <div className='icon-gap-small display-icon overflow-hidden linkedin rounded'>
                                    <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                        <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                            <SiLinkedin size={17.5} />
                                        </span>
                                        <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                            <SiLinkedin size={17.5} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/'>
                                <div className='icon-gap-small display-icon overflow-hidden mail rounded'>
                                    <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                        <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                            <Mail size={17.5} />
                                        </span>
                                        <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                            <Mail size={17.5} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col lg={9} className='ps-md-4'>
                        <h3 className='fw-lighter text-dark lh-x-small mb-2'>
                            Ian White
                        </h3>
                        <h6 className='fw-lighter text-dark lh-x-small mb-2'>
                            Content Writer at XIRCLS
                        </h6>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Ian is an article writer and content creator who loves diving deep into topics and learning what is at the core of complex issues.</p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>He obtained his degrees in Biology and English from the University of Utah in 2017. After exploring New York City for a number of years where he met his wife, he moved back to Utah, where he grew up.</p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>He now lives in the Red Rock country of southern Utah with his wife and two cats, who are much more like children than cats, Tony and Olivia.</p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Ian is a curious writer who always puts his focus on empathizing with his audience from a very genuine place, and loves collaborating with businesses and business owners to help facilitate growth through rigorously researched, meaningful content.</p>
                        <p className='sixth-font-blog fw-lighter text-dark lh-md mb-1'>Reach out to Ian on <Link to='/' className="text-blue hover-black">LinkedIn</Link>, or via <Link to='/' className="text-blue hover-black">Email</Link></p>
                    </Col>
                </Row>
                <Row className="py-6 font-two">
                    <Col xs={12}>
                        <p className='fw-light lh-x-small font-25px-res text-dark mb-2'>Posts By Ian White:</p>
                    </Col>
                    {blogs.filter(blog => blog.author === 'Ian White').map((blog, key) => {
                        return (
                            <Col id={`blogCard-${key}`} key={key} sm={4} className='mb-3'>
                                <div className='border rounded overflow-hidden'>
                                    <img src={blog.blogImage} className='w-100' />
                                    <div className='p-2'>

                                        <div className='font-12px-st text-light-gray'>
                                            <Calendar size={12} /> {blog.date}
                                        </div>
                                        <Link to={blog.link} className='fw-light font-16px-res text-black hover-blue text-uppercase'>{blog.heading}</Link>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
export default Ian