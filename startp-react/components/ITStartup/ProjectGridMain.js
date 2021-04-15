import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost';
import projectList from '@/utils/projectList'


 
const ProjectGridMain = () => {
    return (
        <> 
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

        </>
    )
}

export default ProjectGridMain;