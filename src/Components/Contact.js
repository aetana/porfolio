import React, { useState } from 'react';

const Contact = ({ data }) => {
   //const [url, setUrl] = useState('mailto:test@example.com?subject=subject&body=body');
   const [name, setName] = useState('');
   const [subject, setSubject] = useState('');
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
   const [error, setError] = useState(false);
   // const [formData, setFormData] = useState({
   //    name:"",
   //    subject:"",
   //    email:"",
   //    message:""
   // });

   const [submitSuccess, setSubmitSuccess] = useState(false);


   // const handleChange = (event) => {
   //    setFormData({
   //      ...formData,
   //      [event.target.name]: event.target.value,
   //    });
   //  };

   console.log(data)

   //  const handleClick = (e) => {
   //    e.preventDefault();
   //    window.open(`mailto:${email}?subject=${subject}&body=${name}: ${message}`);
   //  }

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         // Validate the required fields
         if (!name || !email || !subject || !message) {
            await setError(true);
            console.log(name, email)
            console.log("line 40 in contact js excuted");
            throw new Error("Name, email, Subject and message are required fields.");
         }
         const response = await fetch("https://api.amanueletana.com/message", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ "name": name, "email": email, "subject": subject, "message": message }),//all data should be sent change it later
         });
         if (!response.ok) {
            throw new Error("Failed to send the form data.");
         }

         // Once the form is sent successfully, set the success message
         setSubmitSuccess(true);
         setName("");
         setSubject("");
         setEmail("");
         setMessage("");
         setPhone("");
         setTimeout(()=>{
            setSubmitSuccess(false);
            setError(false);
         }, 2000) 
      } catch (e) {
         // setError(error);
         console.log(e)
      }
      

   };



   return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

               <p className="lead">{data?.message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">
               <form id="contactForm" name="contactForm">
                  {
                     submitSuccess ? (
                        <div style={{ textAlign: 'center', color: 'green', margin:'5px' }} >
                           <i className="fa fa-check"></i>Your message was sent, thank you!<br />
                        </div>
                     ) : error ? (

                        <div style={{ textAlign: 'center', color: 'red', margin:'5px' }}> Name, email, Subject and message are required fields.</div>
                     ) : (<></>)
                  }
                  <fieldset>

                     <div>
                        <label htmlFor="contactName">Name <span className="required">*</span></label>
                        <input value={name} type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={e => setName(e.target.value)} />
                     </div>

                     <div>
                        <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                        <input value={email} type="email" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={e => setEmail(e.target.value)} required />
                     </div>
                     <div>
                        <label htmlFor="contactPhone">Phone</label>
                        <input value={phone} type="tel" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={e => setPhone(e.target.value)} />
                     </div>
                     <div>
                        <label htmlFor="contactSubject">Subject<span className="required">*</span></label>
                        <input value={subject} type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={e => setSubject(e.target.value)} />
                     </div>

                     <div>
                        <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                        <textarea value={message} onChange={e => setMessage(e.target.value)} cols="50" rows="15" id="contactMessage" name="contactMessage"></textarea>
                     </div>

                     <div>
                        <button type='submit' onClick={handleSubmit} className="submit">Submit</button>
                        <span id="image-loader">
                           <img alt="" src="images/loader.gif" />
                        </span>
                     </div>
                  </fieldset>
               </form>
               <div id="message-warning"> Error boy</div>
               <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
               </div>
            </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

                  <h4>Address and Phone</h4>
                  <p className="address">
                     {data?.name}<br />
                     {data?.address.street} <br />
                     {data?.address.city}, {data?.address.state} {data?.address.zip}<br />
                     <span>{data?.phone}</span>
                  </p>
               </div>

               <div className="widget widget_tweets">

               </div>
            </aside>
         </div>
      </section>
   );
}

export default Contact;
