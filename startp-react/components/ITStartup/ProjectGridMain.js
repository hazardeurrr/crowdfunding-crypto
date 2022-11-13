import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost';
import { useSelector } from 'react-redux';
import {getOne } from '../../firebase-crowdfund/queries'
import {db, firebase} from '../../firebase-crowdfund/index' 


 
const ProjectGridMain = () => {
    

    const projectList = useSelector((state) => state.firstCampaigns)

    React.useEffect(() => {
      }, [projectList]);
    // const [user, setUser] = React.useState(undefined);

    const displayProjects = () => {
        console.log(projectList)
        const len = projectList.length > 6 ? 6 : projectList.length
        var rows = [];
        for (var i = 0; i < len; i++) {
                    rows.push( <div key={i} className="col-lg-4 col-md-6">
            <SimpleCampaignPost project={projectList[i]}
                />
            </div>);
        }
        return rows;
      }


    return (
        <> 
            <div className="blog-area ptb-80">
                <div className="container">
                    <div className="section-title">
                        <span className="sub-title">Featured campaigns</span>
                        <h2>Discover projects that inspire you</h2>
                        <div className="bar"></div>
                    </div>
                    <div className="row justify-content-center">
                        {displayProjects()}
                                    
                                    <div className="col-lg-12 col-md-12">
                                        <div className="pagination-area">
                                            <nav aria-label="Page navigation">
                                            <Link href={{
                                                    pathname: "/explore",
                                                    // query: {
                                                    //     id: "all",
                                                    // }
                                                }} activeClassName="active">
                                                <a className="btn btn-primary">Explore more...</a>
                                            </Link>
                                            </nav>
                                        </div>
                                    </div>
                    </div>
                </div>
		    </div>

        </>
    )
}

export default ProjectGridMain;