import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class CommentForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
          isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }
    render(){
        
        return(
            <div>


                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil" /> Submit Comment
                </Button>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Control.select defaultValue="1" name="rating" model=".rating" className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="name" md={2}>Your Name</Label>
                                <Control.text id="name" name="name" model=".name" placeholder="Your Name" className="form-control" validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                            
                                        }}/> 
                                <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="email" md={2}>Your Comment</Label>
                                <Control.textarea id="comment" name="comment" model=".comment" className="form-control" rows={6}/>
                            </div>
                            <button onClick={this.toggleModal} className="form-control btn btn-primary">Submit</button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
        }
}
function RenderCampsite({campsite}) {
    return(
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
            
        </div>
    );
}

function RenderComments({comments}) {
    if (comments){
        return(
            <div className="col-5-md m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return(
                        <div>
                            <p>{comment.text}<br />{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    )
                })}
                <CommentForm />
            </div>
        );
    }
    return <div></div>
}
  

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
} 



export default CampsiteInfo;