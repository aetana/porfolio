import React, { useState } from 'react';
import { Modal} from 'react-bootstrap';

const Blog = ({ data }) => {

  const [show, setShow] = useState(false);
  const [src, setSrc] = useState(null);

  const handleShow = src => {
    console.log(src)
    setSrc(src);
    setShow(true);
  };
  const handleClickOutside = (event) => {
    console.log("cliked outside")
    setShow(false);
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const PDFModal = ({ show, setShow, src }) => {
    return (
      <Modal className='modal' size="lg" show={show} onHide={() => setShow(false)}>
       
        <Modal.Body>
          <embed src={src} type="application/pdf" width="100%" height="500px" />
        </Modal.Body>
      </Modal>
    );
  };

  if (data) {
    var education = data.education.map(function (education) {
      return <div key={education.school}><h3>{education.school}</h3>
        <p className="info">{education.degree}</p>
        <img onClick={() => handleShow(education.pdf)} className="info" src={`images/${education.blogImage}`} style={{cursor:"pointer"}}/>
        <a onClick={() => handleShow(education.pdf)}>{education.description}</a></div>
    })
  }

  return (
    <section id="blog">

      <PDFModal show={show} setShow={setShow} src={src} />
      <div className="row education">
        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">
              {education}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

}

export default Blog;
