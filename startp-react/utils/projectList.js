import {getAll} from '../firebase-crowdfund/queries'

export function getCampaigns() {
  let campaigns = []
  getAll('campain', docs => {
    docs.forEach(element => {
      campaigns.push(element)
    });
  })
  return campaigns
}

var projectList = [
  {
    categories:['Technology', 'Innovation'],
    title : "Invest'easy : the new revolutionazing investment app !",
    small_description:"Invest'easy is an app made to make investing easier for beginners. Invest'easy is an app made to make investing easier for beginners. Invest'easy is an app made to make investing",
    creator:"0x3478908604585154",
    raised:3.56654545,
    objective:5,
    currency:'ETH',
    start_date:1619641611,
    flexible: true,
    end_date:1622233612,
    main_img: 'https://dl.img-news.com/dl/img/s3/dl/2020/09/should-you-buy-tesla-stock.jpg',
    contract_address:'0x56985475654az9e8z5f6az5',
    tiers: [{threshold: 0.1,
      title: 'Get a free stock',
      description: "You will get a free stock when our app is up, thanks for being one of the first contributor !"
    }, 
    {
      threshold: 0.2,
      title: 'Get two free stocks',
      description: "You will get two free stocks when our app is up, thanks for being one of the first contritbutor !"
    },
    {
      threshold: 0.5,
      title: 'Special thanks on our app',
      description: "You will get two free stocks and a special thanks in our app !"
    }],
    long_desc:"<h4>Invest'easy, the new way of investing for young and dynamic people</h4><p>Hello, herre is a long description. <br>Bla bla bla</p> <h4>And now what ?</h4><p>I don't know but if you pay we will launch the project asap !</p><img src='https://www.w3schools.com/images/w3schools_green.jpg' alt='W3Schools.com'>"
  },
  {
    categories: ['Innovation'],
    title : "Vuna Coffee Rituals The Simplest Coffee Brew in a Bag Bag Bag",
    small_description:"Our product is the new innovation in the energy market.",
    creator:"0x8138347572947404",
    raised:0.52,
    objective:10,
    flexible: true,
    currency:'ETH',
    start_date:1619741611,
    end_date: 1625233612,
    main_img: 'https://dl.img-news.com/dl/img/s3/dl/2020/09/should-you-buy-tesla-stock.jpg',
    contract_address:'0x56985475654az9e8z5f6az6',
    tiers: [{threshold: 0.1,
      title: 'Get a free stock',
      description: "You will get a free stock when our app is up, thanks for being one of the first contributor !"
    }, 
    {
      threshold: 0.2,
      title: 'Get two free stocks',
      description: "You will get two free stocks when our app is up, thanks for being one of the first contritbutor !"
    },
    {
      threshold: 0.5,
      title: 'Special thanks on our app',
      description: "You will get two free stocks and a special thanks in our app !"
    }],
    long_desc:"<h4>Invest'easy, the new way of investing for young and dynamic people</h4><p>Hello, herre is a long description. <br>Bla bla bla</p> <h4>And now what ?</h4><p>I don't know but if you pay we will launch the project asap !</p><img src='https://www.w3schools.com/images/w3schools_green.jpg' alt='W3Schools.com'>"
  },
  {
    categories:['Charity', 'Special Event'],
    title : "Help us saving the children",
    small_description:"Charityy is an organization that helps children in various countries",
    creator:"0x8138347572947404",
    raised:41023.2654565,
    objective:20000,
    currency:'USDT',
    flexible: true,
    start_date: 1619641611,
    end_date: 1622233612,
    main_img: 'https://dl.img-news.com/dl/img/s3/dl/2020/09/should-you-buy-tesla-stock.jpg',
    contract_address:'0x569854865654az9e8z5f6az6',
    tiers: [{threshold: 0.1,
      title: 'Get a free stock',
      description: "You will get a free stock when our app is up, thanks for being one of the first contributor !"
    }, 
    {
      threshold: 0.2,
      title: 'Get two free stocks',
      description: "You will get two free stocks when our app is up, thanks for being one of the first contritbutor !"
    },
    {
      threshold: 0.5,
      title: 'Special thanks on our app',
      description: "You will get two free stocks and a special thanks in our app !"
    }],
    long_desc:"<h4>Invest'easy, the new way of investing for young and dynamic people</h4><p>Hello, herre is a long description. <br>Bla bla bla</p> <h4>And now what ?</h4><p>I don't know but if you pay we will launch the project asap !</p><img src='https://www.w3schools.com/images/w3schools_green.jpg' alt='W3Schools.com'>"

  },
  {
    categories:['Innovation'],
    title : "The future of energy",
    small_description:"Our product is the new innovation in the energy market.",
    creator:"0x8996575533815723",
    raised:0.52,
    objective:10,
    currency:'ETH',
    flexible: false,
    start_date: 1619641611,
    end_date: 1622233612,
    main_img: 'https://dl.img-news.com/dl/img/s3/dl/2020/09/should-you-buy-tesla-stock.jpg',
    contract_address:'0x56985475654az9f8z5f6az7',
    tiers: [{threshold: 0.1,
      title: 'Get a free stock',
      description: "You will get a free stock when our app is up, thanks for being one of the first contributor !"
    }, 
    {
      threshold: 0.2,
      title: 'Get two free stocks',
      description: "You will get two free stocks when our app is up, thanks for being one of the first contritbutor !"
    },
    {
      threshold: 0.5,
      title: 'Special thanks on our app',
      description: "You will get two free stocks and a special thanks in our app !"
    }],
    long_desc:"<h4>Invest'easy, the new way of investing for young and dynamic people</h4><p>Hello, herre is a long description. <br>Bla bla bla</p> <h4>And now what ?</h4><p>I don't know but if you pay we will launch the project asap !</p><img src='https://www.w3schools.com/images/w3schools_green.jpg' alt='W3Schools.com'>"

  },
  {
    categories:['Charity'],
    title : "Save children",
    small_description:"Help us saving the children",
    creator:"0x8996575533815722",
    raised:1,
    objective:2,
    currency:'ETH',
    flexible: false,
    start_date:1619641611,
    end_date:1619649152,
    main_img: 'https://dl.img-news.com/dl/img/s3/dl/2020/09/should-you-buy-tesla-stock.jpg',
    contract_address:'0x56985475654az9e8z5f6az8',
    tiers: [{threshold: 0.1,
      title: 'Get a free stock',
      description: "You will get a free stock when our app is up, thanks for being one of the first contributor !"
    }, 
    {
      threshold: 0.2,
      title: 'Get two free stocks',
      description: "You will get two free stocks when our app is up, thanks for being one of the first contritbutor !"
    },
    {
      threshold: 0.5,
      title: 'Special thanks on our app',
      description: "You will get two free stocks and a special thanks in our app !"
    }],
    long_desc:"<h4>Invest'easy, the new way of investing for young and dynamic people</h4><p>Hello, herre is a long description. <br>Bla bla bla</p> <h4>And now what ?</h4><p>I don't know but if you pay we will launch the project asap !</p><img src='https://www.w3schools.com/images/w3schools_green.jpg' alt='W3Schools.com'>"

  },
  {
    categories:['Charity', 'Technology'],
    title : "Help us !",
    small_description:"Help us saving the children",
    creator:"0x899657553381574",
    raised:4,
    objective:2,
    currency:'ETH',
    flexible: false,
    start_date: 1619641611,
    end_date: 1619690885,
    main_img: 'https://dl.img-news.com/dl/img/s3/dl/2020/09/should-you-buy-tesla-stock.jpg',
    contract_address:'0x56985475654az9e8z5f6az9',
    tiers: [],
    long_desc:"<h4>Invest'easy, the new way of investing for young and dynamic people</h4><p>Hello, herre is a long description. <br>Bla bla bla</p> <h4>And now what ?</h4><p>I don't know but if you pay we will launch the project asap !</p><img src='https://www.w3schools.com/images/w3schools_green.jpg' alt='W3Schools.com'>"

  },
]

export default projectList;