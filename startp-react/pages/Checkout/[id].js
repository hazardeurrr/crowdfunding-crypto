import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import PricingTiers from '@/components/Common/PricingTiers';
import Custom404 from 'pages/404';
import {getOne} from 'firebase-crowdfund/queries';
import CircularProgress from '@material-ui/core/CircularProgress';
 
const DonationCheckout = (props, {c}) => {
   
    const [campaign, setCampaign] = React.useState(undefined)


    React.useEffect(() => {
        getOne('campaign', props.address.toLowerCase(), function(docs) {
            if (docs.exists) {
                setCampaign(docs.data())
            } else {
                console.log("Document not found")
            }
        })
      }, [c])
    

    // const campaign = projectList.find(e => e.contract_address == props.address)

    var now = Date.now() / 1000            

        const displayContent = () => {
            if(campaign == undefined){
                return <>
                <Navbar />
    
                <CircularProgress/>
    
    
                <Footer />
            </>
            } else {
                if(now > campaign.end_date || now < campaign.start_date){
                    return  <>
                        <Navbar />
        
                        <Custom404 />
        
                        <Footer />
                    </>
                    } else {
                        return (
                            <>
                                <Navbar />
                    
                                <PageBanner pageTitle = "You are supporting :"/>
                    
                                <PricingTiers project = {campaign} />
                    
                                <Footer />
                            </>
                        )
                    }
                }
            }
        

    return (
        displayContent()
    )
}

export default DonationCheckout;

export async function getServerSideProps (context) {
    console.log(context.query) 
    // returns { id: episode.itunes.episode, title: episode.title}
    
  
    //you can make DB queries using the data in context.query
    return {
        props: { 
           address: context.query.id.toLowerCase() //pass it to the page props
        }
    }
  }