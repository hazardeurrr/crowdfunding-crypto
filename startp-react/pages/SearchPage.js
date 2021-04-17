import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import OurFeatures from '@/components/Features/OurFeatures';
import SingleFeatures from '@/components/Features/SingleFeatures';
import projectList from '@/utils/projectList'
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost';
import Chip from '@material-ui/core/Button';
import CategoryList from '@/utils/CategoryList';
import ListGroup from 'react-bootstrap/ListGroup';
import CheckboxList from '@/components/Common/CheckboxList'

class SearchPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            languagesSelected: ["EN"],
            categoriesSelected: []
        }
    }



    render(){
        return (
            <>
                <Navbar />
                <PageBanner />
                <div className="features-area pt-80 pb-50 bg-f7fafd">
                    <div className="container">
                        <div className="section-title">
                            <h2>Discover the projects that need you !</h2>
                            <div className="bar"></div>


                            <CheckboxList data={CategoryList}/>



                        </div>
                    </div>
                </div>
                <div className="blog-area ptb-80">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 col-md-6">
                                        <SimpleCampaignPost project={projectList[0]}
                                        />
                                    </div>

                                    <div className="col-lg-4 col-md-6">
                                        <SimpleCampaignPost project={projectList[1]}
                                        />
                                    </div>

                                    <div className="col-lg-4 col-md-6">
                                        <SimpleCampaignPost project={projectList[2]}
                                        />
                                    </div>
                                    
                                    <div className="col-lg-4 col-md-6">
                                        <SimpleCampaignPost project={projectList[3]}
                                        />
                                    </div>

                                    <div className="col-lg-4 col-md-6">
                                        <SimpleCampaignPost project={projectList[4]}
                                        />
                                    </div>

                                    <div className="col-lg-4 col-md-6">
                                        <SimpleCampaignPost project={projectList[5]}
                                        />
                                    </div>
                                    
                                    {/* Pagination */}
                                    {/* <div className="col-lg-12 col-md-12">
                                        <div className="pagination-area">
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                                                    
                                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                    
                                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                    
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                    
                                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                <Footer />
            </>
        )
    }
}

export default SearchPage;