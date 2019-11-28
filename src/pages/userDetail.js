import React, { Component } from "react";
import {
    Button,
    Card,
    Container,
    Dropdown,
    Form,
    Grid,
    Header,
    Icon,
    Input,
    Image,
    Menu,
    Message,
    Modal,
    Pagination,
    Select,
    Segment,
  } from 'semantic-ui-react'

  const backgroundStyle = {
    height: "100vh",
    backgroundImage: `url(https://i.ibb.co/dQykXsR/2560x1080-F5-F5-F5.png)`,
    backgroundRepeat: "null",
    backgroundSize: 'cover',
    overflow: 'hidden',
  };


class App extends Component {
    render(){
        return(
            <div style={backgroundStyle}>
                <div style={{marginLeft:"12em", marginLeft:"10em", marginBottom:"40em"}}>

                
                <Grid style={{ marginTop: "5em", marginBottom:"0em"}}>
                    <Grid.Column width={4}>
                        <Image 
                            src={'https://image.flaticon.com/icons/svg/168/168729.svg'} 
                            wrapped ui={false} 
                            as='a'
                            onClick={null}
                            />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Segment>
                            <Header as='h2' dividing>
                                Alice Smith
                            </Header>
                            <Header.Subheader>
                                Needs a <strong>$900</strong> room in <strong>Los Angles</strong> | Female | 26 years old
                            </Header.Subheader>
                        </Segment>
                        <Segment>
                            <Header as='h2'>
                                About
                            </Header>
                            <Header as='h4'>
                                 <Icon name='suitcase' size='large'/>
                                 <Header.Content>Occupation: </Header.Content>
                            </Header>
                            <Header as='h4'>
                                 <Icon name='transgender' size='large'/>
                                 <Header.Content>Gender: </Header.Content>
                            </Header>
                            <Header as='h4'>
                                 <Icon name='clock' size='large'/>
                                 <Header.Content>Age: </Header.Content>
                            </Header>
                           
                        </Segment>
                    </Grid.Column>
                </Grid>
                </div>
            </div>//---
        );
    }
}

export default App;