import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost';
import projectList from '@/utils/projectList'


 
const ProjectGridMain = () => {

    const len = projectList.length > 6 ? 6 : projectList.length

    const displayProjects = () => {
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
                    <div className="row justify-content-center">
                        {displayProjects()}
                    </div>
                </div>
		    </div>

        </>
    )
}

export default ProjectGridMain;