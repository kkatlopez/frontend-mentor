import React, { Component } from 'react';
import Tag from './Tag.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function JobListing(listing) {
    var job = listing.job;
    var tags = [ job.role, job.level, ...job.languages ];
    
    return (
        <Container className="job-listing py-4 my-4">
            <Row>
                <Col xs={12} md={2} className="d-flex px-0">
                    <img src={job.logo} className="mx-auto"/>
                </Col>
                <Col md={4} className="d-flex flex-column align-self-center">
                    <div className="job-company">{job.company}</div>
                    <div className="job-position">{job.position}</div>
                    <div className="job-addl d-flex justify-content-between">
                        <span>{job.postedAt}</span>
                        <span>•</span>
                        <span>{job.contract}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                    </div>
                </Col>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    {tags.map(t => {
                        return(<Tag name={t} />)
                    })}
                </Col>
            </Row>
        </Container>
    );
}

export default JobListing;