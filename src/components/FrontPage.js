import React, { useState } from 'react'
import './FrontPage.css'

import TextField from '@material-ui/core/TextField'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Button } from '@material-ui/core'
import jsPDF from 'jspdf'

function FrontPage() {

    const[name , setName]=useState("")
    const[profession , setProfession]=useState('')
    const[About , setAbout]=useState("")
    const[skills, setSkills]=useState("")
    const[eaducation , setEaducation]=useState("")
    const[achievements , setAchievements]=useState("")
    const[papers , setPapers]=useState("")
    const[projects, setProjects]=useState("")
    const[portfolio , setPortfolio]=useState("")
    const[contact , setContact]=useState("")
    const[avatar , setavatar]=useState('')
    const[can , setcanvas]=useState()

   

    const myRef = React.useCallback(node =>{
        if (node !== null) {
            setcanvas(node)
          }
        }, []);


    const imageHandler = (e)=>{

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setavatar(reader.result)
        }
    }

    const generate = ()=>{
        var result;
        var width = 0, i, j;
        var text = About
        var lines = []
        const skillsArr = skills.split(',')
        const EduArr = eaducation.split(',')
        const AchiArr = achievements.split(',')
        const papArr = papers.split(',')
        const projArr = projects.split(',')
        const contArr = contact.split(',')
      
        var canvas = can
        var context = canvas.getContext('2d');
        var img1 = new Image();
        var img2 = new Image();
        
        // Start calculation
    while ( text.length ) {
    	for( i=text.length; context.measureText(text.substr(0,i)).width > 280; i-- );
    
    	result = text.substr(0,i);
        
       if ( i !== text.length )
    		for( j=0; result.indexOf(" ",j) !== -1; j=result.indexOf(" ",j)+1 );
           
    	
        lines.push( result.substr(0, j|| result.length) );
        width = Math.max( width, context.measureText(lines[ lines.length-1 ]).width );
    	text  = text.substr( lines[ lines.length-1 ].length, text.length );
    
    }

        img1.onload = function() {
            canvas.width = img1.width;
            canvas.height = img1.height;
            img2.src = avatar;
            
    }
   
    img2.onload = function() {
        context.globalAlpha = 1.0;
        context.drawImage(img1, 0, 0);
        context.globalAlpha = 1.0; 
        context.drawImage(img2, 60, 80,300,300);
        context.font = '50px Arial';
        context.fillStyle = '#000000';
        context.fillText( name ,800,250); 
        context.font = '30px Arial';
        context.fillStyle = '#800000';
        context.fillText( profession, 800,350); 
        context.font = '40px Arial';
        context.fillStyle = '#800000';
        context.fillText('About Me', 80,490); 
        context.font = '25px Arial';
        context.fillStyle = '#000000';
        for(let i=0; i<lines.length; i++)
        context.fillText( lines[i] , 80, 550+(i*29)); 
        context.font = '40px Arial';
        context.fillStyle = '#800000';
        context.fillText('Skills', 100, 1250)
        context.font = '30px Arial';
        context.fillStyle = '#000000';
        for(let i=0; i<skillsArr.length; i++)
        context.fillText( skillsArr[i].trim() , 100, 1300+(i*35))
        context.font = '40px Arial';
        context.fillStyle = '#800000';
        context.fillText('Education', 800, 490)
        context.font = '30px Arial';
        context.fillStyle = '#000000';
        for(let i=0; i<EduArr.length; i++)
        context.fillText(EduArr[i].trim() , 800, 530+(i*40))
        context.font = '40px Arial';
        context.fillStyle = '#800000';
        context.fillText('Achievements', 800, 850)
        for(let i=0; i<AchiArr.length; i++)
        context.font = '30px Arial';
        context.fillStyle = '#000000';
        for(let i=0; i<AchiArr.length; i++)
        context.fillText(`🏆 ${AchiArr[i].trim()}` , 800, 900+(i*35))
        context.font = '40px Arial';
        context.fillStyle = '#800000';
        context.fillText('Papers Presented', 800, 1200)
        context.font = '30px Arial';
        context.fillStyle = '#000000';
        for(let i=0; i<papArr.length; i++)
        context.fillText(`📎 ${papArr[i].trim()}` , 800, 1250+(i*35))
        context.font = '40px Arial';
        context.fillStyle = '#800000';
        context.fillText('Projects', 800, 1550)
        context.font = '30px Arial';
        context.fillStyle = '#000000';
        for(let i=0; i<projArr.length; i++)
        context.fillText(`👉 ${projArr[i].trim()}` , 800, 1640+(i*35))
        context.font = '40px Arial';
        context.fillStyle = '#800000';
        context.fillText('Contact', 80, 1680);
        context.font = '30px Arial';
        context.fillStyle = '#000000';
        for(let i=0; i<contArr.length; i++)
        context.fillText(`${contArr[i].trim()}` , 80, 1750+(i*35))
        context.font = '40px Arial';
        context.fillStyle = '#800000';
        context.fillText('Portfolio Link', 800, 1850);
        context.font = '20px Arial';
        context.fillStyle = '#000000';
        context.fillText(portfolio , 800, 1890);
        download()
    }
    img1.src = '/template.png'
}
      function download(){
       

        var image = can.toDataURL("image/png").replace("image/png", "image/octet-stream");
        console.log(image)

        var doc = new jsPDF("p", "mm", "a4");
        var pdfWidth = doc.internal.pageSize.getWidth();
        var pdfHeight = doc.internal.pageSize.getHeight();
        doc.addImage(image, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        doc.save('resume.pdf')
     }     


    return (
        <div className="generator__container">
            <div className="text_container">
           <TextField className="textfield" label="Enter Your Name" placeholder="Eg: Ragul" variant="standard" color="primary" value={name} onChange={(e)=> setName(e.target.value)} />
        </div>
        <div className="text_container">
           <TextField className="textfield" label="Enter Your Profession" placeholder="Eg: CEO @ Primostepz" variant="standard" color="primary" value={profession} onChange={(e)=> setProfession(e.target.value)} />
        </div>
        <div className="text_container fullwidth">
           <TextField className="textfield"  helperText="Max 100 Words" label="About Me" fullWidth placeholder="Eg: I am very enthuastic.." variant="standard" color="primary" multiline rowsMax={6} value={About} onChange={(e)=> setAbout(e.target.value)} />
        </div>
        <div className="text_container fullwidth">
           <TextField className="textfield"  helperText="Seperate skills with ," label=" Top 5 Skills" fullWidth placeholder="Eg: MERN STACK, Graphic Design, Editing" variant="standard" color="primary" multiline rowsMax={4} value={skills} onChange={(e)=> setSkills(e.target.value)} />
        </div>
        <div className="text_container fullwidth">
           <TextField className="textfield"  helperText="Seperate colleges with ," label="Eaducation" fullWidth placeholder="Eg: KEC BE ECE, Harward University MS" variant="standard" color="primary" multiline rowsMax={4} value={eaducation} onChange={(e)=> setEaducation(e.target.value)} />
        </div>
        <div className="text_container fullwidth">
           <TextField className="textfield"  helperText="Seperate Achievements with ," label="Achievements" fullWidth placeholder="Eg: 1st prize in hackathon 2020, Top 10 in TopCoder 2020" variant="standard" color="primary" multiline rowsMax={4} value={achievements} onChange={(e)=> setAchievements(e.target.value)} />
        </div>
        <div className="text_container fullwidth">
           <TextField className="textfield"  helperText="Seperate papers with ," label="Papers Presented" fullWidth placeholder="Eg: IOT In Agriculture presented in IEEE 2020 submit, IOT 5.0 in Sona College" variant="standard" color="primary" multiline rowsMax={4} value={papers} onChange={(e)=> setPapers(e.target.value)} />
        </div>
        <div className="text_container fullwidth">
           <TextField className="textfield"  helperText="Seperate projects with ," label="Projects" fullWidth placeholder="Eg: Netflix Clone, Instagram Clone, Wordpress Clone" variant="standard" color="primary" multiline rowsMax={4} value={projects} onChange={(e)=> setProjects(e.target.value)} />
        </div>
        <div className="text_container fullwidth">
           <TextField className="textfield"  helperText="If portfolio not use github link" label="Portfolio LINK" fullWidth placeholder="Eg:https://primostepz.com" variant="standard" color="primary"  value={portfolio} onChange={(e)=> setPortfolio(e.target.value)} />
        </div>
        <div className="text_container fullwidth">
           <TextField className="textfield"  helperText="separate mail phone number website with ," label="Contact Details" fullWidth placeholder="Eg:ceo@primostepz.com, rahul.io, phn num" variant="standard" color="primary"  value={contact} onChange={(e)=> setContact(e.target.value)} />
        </div>
        <div>
               <label className="upload__btn" >
               <input  type="file" accept="image/*" onChange={imageHandler}></input>
                   <div className="input_container">
                   <CloudUploadIcon className="icon" fontSize="large" titleAccess="upload Image"/>
                   <p className="upload_label">Upload Image</p>
                   </div>
               </label>         
           </div>
           <Button className="bttn" onClick={generate} variant={'contained'}>Generate Resume</Button>
           <div className="canvas_container">
           <canvas ref={myRef} className="canvas"></canvas>
           </div>
        
        </div>
    )
}

export default FrontPage
