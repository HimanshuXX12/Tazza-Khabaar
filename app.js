
// const url= "https://newsapi.org/v2/everything?q=";
const env= require("dotenf").config();
const url=process.env.API_URL;
const key=process.env.KEY;

// const key="f0d24385e1c041d3a9d93d70e00357db";
// const env=require("dotenv").config();
// const url=process.env.API_URL;
// const key=process.env.API_KEY;


window.addEventListener("load",async ()=>{
       fetchNews("India");
})



async function fetchNews(query)
{
    const fetch_url= await fetch(`${url}${query}&apiKey=${key}`);

 
    const  data=  await fetch_url.json();



     fetching(data.articles);
     console.log("data articles",data.articles);
     console.log(query);


    
}



async function fetching(articles)
{


    

      
    const clone_source= document.getElementById('template-card');
    const destination= document.getElementById('destination');


     if(!destination.innerHTML=="")
     {
         destination.innerHTML="";
     }



    for( let i=0;i<articles.length;i++)
    {


        // if(!articles[i].urlToImage)
        // {
        //      return ;
        // }

        const clone= clone_source.content.cloneNode(true);

        filling(clone,articles[i]);

        destination.appendChild(clone);

       
    }


  
}



async function filling( clone, article)
{


     const image= clone.querySelector('#image');

     const title= clone.querySelector("#title");
    console.log('comming');
     const source=clone.querySelector("#source");
     const  desc=clone.querySelector("#desc");


     image.src=article.urlToImage;
    
     title.innerHTML=article.title;
     desc.innerHTML=article.description;

     const date= new Date(article.publishedAt).toLocaleString("en-US","Asia/Jakarta");
     source.innerHTML=`${article.source.name} : ${date}`;
   
     clone.firstElementChild.addEventListener("click", (e) => {
        window.open(article.url, "_blank");
    });
    


     
  






}



let checker=false;
let intial=null;

async function fetcher(item)
{
    
    fetchNews(item);
    let element=document.getElementById(item);

    console.log(intial);



    if(intial!==null)
    {
        intial.classList.remove('active');
    }
    intial=element;

    intial.classList.add('active');


  console.log(intial);

    



  

}


const home_btn=document.getElementById('home-btn');

home_btn.addEventListener('click',(e)=>{
      window.location.reload();
})



const button= document.getElementById('button');
const text= document.getElementById('search-text');

text.addEventListener("blur", async ()=>{
      if(text.value)
      {
          text.classList.add("filled");
      }
      else{
          text.classList.remove("filled");
      }
})

 
button.addEventListener('click',(e)=>{
 


      if(!text)
      {
         return ;
      }
      else {
        fetchNews(text.value);
        intial.classList.remove('active');
         
      }
})


 console.log(text);

text.addEventListener('keypress',(e)=>{
 
   console.log("enter is pressses");

    if(!text)
    {
       return ;
    }
    else if(e.key=='Enter')
    {
        
      fetchNews(text.value);
      intial.classList.remove('active');
       
    }
})




