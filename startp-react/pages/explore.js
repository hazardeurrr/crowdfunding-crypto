import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import SimpleCampaignPost from '@/components/Common/SimpleCampaignPost';
import SimplePreCampaignPost from '@/components/Common/SimplePreCampaignPost';

import CategoryList from '@/utils/CategoryList';
import Checkbox from '@material-ui/core/Checkbox';
import categoryList from '@/utils/CategoryList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Pagination from '@material-ui/lab/Pagination';
import {connect} from 'react-redux'
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'
import { campaignAbi } from '@/components/ContractRelated/CampaignAbi';
import { db } from 'firebase-crowdfund/index';
import { Button } from '@material-ui/core';
import { campaignsCollection, preCampaignsCollection } from '@/utils/collections';


class Explore extends React.Component {

    constructor(props){
        super(props);
        this.props = props
        this.languagesSelected = ["EN"];
        this.categoriesSelected = [];
        this.networksSelected = [];
        this.nbByPage = 9;
        this.lastDoc = this.props.lastFirstDoc;
        this.lastPreDoc = null;

        this.state = {
            projects: this.props.firstCampaigns,
            checked: this.populateCheckArray(),
            network_checked: [chain, bnb_chain],
            page: 0,
            lastBatch: false,
            lastPreBatch: false,
            preProjects: [],
            disabled: false
        }
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.showMore = this.showMore.bind(this);
    }

    

    populateCheckArray(){
        let arr = []
        categoryList.forEach(e => arr.push(false))
        return arr
    }

    handleChange = (event) => {
        let e = event.target.name
        if(this.state.checked[e])
          this.removeCategory(e)
        else
          this.addCategory(e)
        this.setState({checked: this.CheckedArrayChanged(e)})
      };

      handleChangeNetwork = (event) => {
        let e = event.target.name
        if(this.state.network_checked.includes(e)){
          let newArr = this.state.network_checked.filter(a => a != e)
          this.setState({network_checked: newArr})
        }
        else {
          let newArr = [...this.state.network_checked, e]
          this.setState({network_checked: newArr })
        }
      };

      CheckedArrayChanged(i){
          let arr = this.state.checked
          arr[i] = !arr[i]
          return arr
      }
    
    showCheckboxes = () => {
        var rows = [];
        for (var i = 0; i < CategoryList.length; i++) {
            rows.push(<FormControlLabel key={i}
              control={<Checkbox disabled={this.state.disabled} color="default" checked={this.state.checked[i]} onChange={this.handleChange} name={i.toString()} />}
              label={CategoryList[i]}
            />);
        }
        return rows;
      }

      networkCheckboxes = () => {
        // var rows = [];
        // rows.push(<FormControlLabel key={0}
        //   control={<Checkbox color="primary" checked={this.state.network_checked.includes(bnb_chain)} onChange={this.handleChangeNetwork} name={bnb_chain} />}
        //   label={<section>
        //     BNB Chain 
        //     {/* <img style={{height: 17}} src="/images/cryptoicons/bnb.svg"/> */}
        //   </section>}
        // />);
        // rows.push(<FormControlLabel key={1}
        //   control={<Checkbox color="primary" checked={this.state.network_checked.includes(chain)} onChange={this.handleChangeNetwork} name={chain} />}
        //   label={<section>
        //     Ethereum 
        //     {/* <img style={{height: 17}} src="/images/cryptoicons/eth.svg"/> */}
        //   </section>}
        // />);
        // return rows;
      }

    componentDidMount(){
         if(this.props.cat != "all"){
            const s = this.props.cat
            const i = categoryList.indexOf(s)
            this.addCategory(i)
            this.setState({checked: this.CheckedArrayChanged(i)})
         }
    }

    componentDidUpdate(prevProps) {
        // Utilisation classique (pensez bien à comparer les props) :
        if (this.props.firstCampaigns !== prevProps.firstCampaigns) {
          this.loadProjects();
        }
      }


    async dynamicSearch(){
        // console.log(this.categoriesSelected)
        if(this.categoriesSelected.length > 0){
          var newArr = []
          await db.collection(campaignsCollection).where("confirmed", "==", true).where("categories", "array-contains-any", this.categoriesSelected).orderBy("live", "desc").orderBy("like_score", "desc").limit(this.nbByPage)
          .get()
          .then(async (ds) => {
              ds.forEach(element => {
                  newArr.push(element.data())
              })
              if(ds.docs.length > 0){
                this.lastDoc = ds.docs[ds.docs.length-1]
              }
              if(ds.docs.length < this.nbByPage){
                this.setState({lastBatch: true})
                this.searchPre(this.nbByPage - ds.docs.length).then((res) => {
                  this.setState({preProjects: res})
                })
              }
            })
          return newArr
        } else {
          return this.props.firstCampaigns
        }
      }

    async searchPre(nb){
      if(this.categoriesSelected.length > 0){
        var newArr = []
        await db.collection(preCampaignsCollection).where("categories", "array-contains-any", this.categoriesSelected).orderBy("id").limit(nb)
        .get()
        .then((ds) => {
            ds.forEach(element => {
                newArr.push(element.data())
            })
            if(ds.docs.length > 0){
              this.lastPreDoc = ds.docs[ds.docs.length-1]
            }
            if(ds.docs.length < nb){
              this.setState({lastPreBatch: true})
            }
          })
        return newArr     
      } else {
        return []
      }
    }


    
    loadProjects(){
        this.setState({disabled: true})
        this.setState({page: 0})
        this.setState({lastBatch: false})
        this.setState({lastPreBatch: false})
        this.lastDoc = this.props.lastFirstDoc
        this.lastPreDoc = null
        if(this.categoriesSelected.length == 0){
            this.setState({projects: this.props.firstCampaigns})
            this.setState({preProjects: []})
            this.setState({disabled: false})
        }
        else{
          this.dynamicSearch().then((res) => {
            this.setState({projects: res})
            this.setState({disabled: false})
          })
          // this.setState({preprojects: this.dynamicSearchPre()})
        }
      }
      
    async getQuery(){
      if(this.categoriesSelected.length > 0){
        return db.collection(campaignsCollection).where("confirmed", "==", true).where("categories", "array-contains-any", this.categoriesSelected).orderBy("live", "desc").orderBy("like_score", "desc").startAfter(this.lastDoc).limit(this.nbByPage)
        .get()
      } else {
        return db.collection(campaignsCollection).where("confirmed", "==", true).orderBy("live", "desc").orderBy("like_score", "desc").startAfter(this.lastDoc).limit(this.nbByPage)
        .get()
      }
    }

    async getPreQuery(nb){
      if(this.categoriesSelected.length > 0){
        return db.collection(preCampaignsCollection).where("categories", "array-contains-any", this.categoriesSelected).orderBy("id").startAfter(this.lastPreDoc).limit(nb)
        .get()
      } else {
        return db.collection(preCampaignsCollection).orderBy("id").startAfter(this.lastPreDoc).limit(nb)
        .get()
      }
    }

    async showMore(){
      if(!this.lastBatch){
        var newArr = []
        await this.getQuery()
        .then((ds) => {
            ds.forEach(element => {
                newArr.push(element.data())
            })
            if(ds.docs.length > 0){
              this.lastDoc = ds.docs[ds.docs.length-1]
            }
            if(ds.docs.length < this.nbByPage){
              this.setState({lastBatch: true})
              this.showMorePre(this.nbByPage - ds.docs.length)
            }
          })
        let nnA = this.state.projects.concat(newArr)
        this.setState({page: this.state.page + 1})  // useless ?
        this.setState({projects: nnA})
      } else if(!this.lastPreBatch){
        this.showMorePre(this.nbByPage)
      }
    }

  async showMorePre(nb){
    var newArr = []
        await this.getPreQuery(nb)
        .then((ds) => {
            ds.forEach(element => {
                newArr.push(element.data())
            })
            if(ds.docs.length > 0){
              this.lastPreDoc = ds.docs[ds.docs.length-1]
            }
            if(ds.docs.length < nb){
              this.setState({lastPreBatch: true})
            }
          })
        let nnA = this.state.preProjects.concat(newArr)
        // this.setState({page: this.state.page + 1})
        this.setState({preProjects: nnA})
  }

      
    

    addCategory(i){
        this.categoriesSelected.push(categoryList[i]);
        this.loadProjects();
    }

    removeCategory(i){
        this.categoriesSelected = this.categoriesSelected.filter(x => x != categoryList[i])
        this.loadProjects();
    }

    handlePaginationChange = (event, value) => {
        this.setState({page: value});
      };

    displayProjects = () => {
      
        var rows = [];
        // var lproj = this.state.projects.filter(p => this.state.network_checked.includes(p.network))
        // var lproj = this.state.projects.concat(this.state.preprojects)
        var lproj = this.state.projects.concat(this.state.preProjects)
        // var allPreCampaigns = this.state.preprojects
        
        //[0 ... 20[ [20 ... 40[
        // var len = lproj.length < (this.state.page) * this.nbByPage ? lproj.length : (this.state.page) * this.nbByPage;
        // console.log("len : " + len + " / print page : " + this.state.page)
        // for (var i = (this.state.page - 1) * this.nbByPage; i < len; i++) {
        //   if(lproj[i].currency == "$" || lproj[i].currency == "€"){
        //     rows.push( <div key={i} className="col-lg-4 col-md-6">
        //     <SimplePreCampaignPost project={lproj[i]}/>
        //     </div>)
        //   }
        //   else {  
        //     rows.push( <div key={i} className="col-lg-4 col-md-6">
        //     <SimpleCampaignPost project={lproj[i]} creator={lproj[i].creator}
        //     />
        //     </div>)
        //   };
        // }

        lproj.forEach((e, index) => {
          if(e.currency == "$"){
            rows.push( <div key={index} className="col-lg-4 col-md-6">
            <SimplePreCampaignPost project={e}/>
            </div>)
          } else {
            rows.push( <div key={index} className="col-lg-4 col-md-6">
            <SimpleCampaignPost project={e} creator={e.creator}/>
            </div>)
          }
         })
        
        return rows;
      }

      displayShowMoreBtn(){
        if(!(this.state.lastBatch && this.state.lastPreBatch)){
          return <div style={{justifyContent:'center', textAlign:'center'}}><button className="btn btn2 btn-light" onClick={this.showMore}>Show more</button></div>
        }
      }


    render(){
        
        return (
            <>
                {/* <Navbar /> */}
                <div className="features-area pt-80 bg-f7fafd">
                    <div className="container">
                        <div className="section-title">
                            <h2 className="search-page-title">Discover projects that need you !</h2>
                            <div className="bar"></div>
                            {/* <CheckboxList alreadyChecked = {categoryList.indexOf(this.props.cat)} addCat = {this.addCategory} removeCat = {this.removeCategory} /> */}
                            {/* {this.networkCheckboxes()}
                            <br></br> */}
                            {this.showCheckboxes()}
                        </div>
                    </div>
                </div>

                <div className="blog-area ">
                            <div className="container">
                                <div className="row justify-content-center">
                                   {this.displayProjects()}
                                 
                                    
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

                                    {/* <Pagination count={Math.ceil(this.state.projects.length / this.nbByPage)} page={this.state.page} onChange={this.handlePaginationChange.bind(this)} color="standard" /> */}
                                    {this.displayShowMoreBtn()}

                                </div>
                            </div>
                        </div>
                <Footer />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        firstCampaigns: state.firstCampaigns,
        lastFirstDoc: state.lastFirstDoc
    }
}

export default connect(
    mapStateToProps   
  )(Explore);

export async function getServerSideProps (context) {
    // console.log(context.query) 
    // returns { id: episode.itunes.episode, title: episode.title}
    
    if(context.query.id !== undefined && context.query.id !== null){
      return {
        props: { 
           cat: context.query.id //pass it to the page props
        }
      }
    } else {
      return {
        props: { 
           cat: "all" //pass it to the page props
        }
      }
    }
    //you can make DB queries using the data in context.query
    
  }