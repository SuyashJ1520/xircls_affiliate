import React from 'react'
import {
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Col,
    Container,
    Row,
    UncontrolledAccordion
} from 'reactstrap'
export default function FaqComponent({ data, theme }) {


    const Data = data

    if (!Data) {
        return null
    }
    //#ebeaea


    return (
        <div className={`${theme}`} >
         

            <Row className={`justify-content-center ${theme}`} >
                <Col xs="12" md="12" xl="9">

                    <h1 className={`display-6 fw-bolder mb-2 text-center main-heading FAQ`} >FAQ</h1>

                    <Container fluid="sm">
                        <UncontrolledAccordion
                            stayOpen
                            defaultOpen={['999']}
                        >
                            {
                                Data.map((data, index) => (
                                    <AccordionItem key={index}>
                                        <AccordionHeader className="" targetId={index.toString()}>
                                            <h5 className='text-black' >{data.q}</h5>
                                        </AccordionHeader>
                                        <AccordionBody accordionId={index.toString()}>
                                            <h6 className='text-black'>
                                                {data.a}
                                            </h6>
                                        </AccordionBody>
                                    </AccordionItem>
                                )
                                )
                            }

                        </UncontrolledAccordion>
                    </Container>
                </Col>

            </Row>

        </div>
    )
}
