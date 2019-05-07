import React, { Component, Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import Dropzone from 'react-dropzone';
import { Dimmer, Header, Icon, Image, Radio, Button, Container, Input } from 'semantic-ui-react';
import Aviary from 'aviary-react';


//Utils
import queries from '../utils/queries';

import '../css/cssgram.min.css';

const cssFilters = ["original", "_1977", "aden", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"];

class UploapFile extends Component {
    defaultState = {
        file: null,
        currentFilter: '',
        advance: false,
        active: false,
        activeView: 1,
        desc: '',
    }

    state = this.defaultState

    onDrop = async ([file]) => {

        // console.log(file);
        // const response = await this.props.singleUpload({
        //     variables: { file }
        // })
        this.setState({ file })
        //console.log(response);

    }
    handleFilterClick = (filter) => {
        this.setState({
            currentFilter: filter
        })
        // console.log(filter);

    }

    handleAdvance = (ev, { checked }) => {

        this.setState({
            advance: checked
        })
    }

    handleSave = async (URL) => {
        const { desc, file, currentFilter } = this.state;
        let response = await this.props.singleUpload({
            variables: { file }
        })

        const fileURL = response.data.singleUpload.path;

        // console.log(URL);
       response = await this.props.createPost({
            variables: { post: { desc, photo: fileURL || URL, effect: currentFilter } }
        })
        if (response.data.createPost.success) {
            this.setDefaultState()
        }

    }

    setDefaultState = () => {
        this.setState(this.defaultState)
    }

    handleClose = () => {
        this.setState({
            active: false
        })
    }
    handleShowDropzone = () => {
        this.setState({
            active: true
        })
    }

    handleGoToView = (n) => {
        this.setState({ activeView: n })
    }
    handleInputDesc = (ev, { name, value }) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        const { file, currentFilter, advance, active, activeView, desc } = this.state;
        const ImgPreview = () => (
            <figure className={currentFilter} style={styles.previewFigure}>
                <Image
                    src={file.preview}
                    size='medium' />
            </figure>
        )

        return (
            <div style={styles.divPr}>
                <Dimmer
                    active={active}
                    onClickOutside={this.handleClose}
                    page
                >

                    {
                        !file && (
                            <Header as='h2' icon inverted style={styles.dropzoneContainer}>
                                <Dropzone
                                    onDrop={this.onDrop}

                                >
                                    <Icon name='upload' />
                                    Arrastre aquí un archivo
                            </Dropzone>
                            </Header>
                        )
                    }
                    {
                        file && (
                            <div style={styles.previewDiv}>
                                {
                                    advance && (
                                        <Aviary file={file} onSave={this.handleSave} />
                                    )
                                }
                                <Container>

                                    {
                                        activeView === 1 && (
                                            <Fragment>
                                                <Button circular icon="arrow right" size="huge" style={styles.rightButton} onClick={(ev) => this.handleGoToView(2)} />
                                                {
                                                    !advance && <ImgPreview />
                                                }



                                                <Radio onChange={this.handleAdvance} toggle /> <span style={{ color: "black" }}>Ir a {advance ? "Avanzado" : "Simple"}</span>
                                                {
                                                    !advance && (
                                                        <Image.Group size='tiny' style={styles.divFilters}>

                                                            {
                                                                cssFilters.map((filter, i) => (
                                                                    <div key={i} style={styles.divFigure} onClick={() => this.handleFilterClick(filter)}>
                                                                        <h4 style={styles.h4}>{filter}</h4>
                                                                        <figure className={filter} style={styles.figure}>
                                                                            <Image
                                                                                src={file.preview}
                                                                                size='medium' />

                                                                        </figure>
                                                                    </div>

                                                                ))
                                                            }
                                                        </Image.Group>
                                                    )
                                                }
                                            </Fragment>
                                        )

                                    }
                                    {
                                        activeView === 2 && (
                                            <Fragment>
                                                <Button circular icon="arrow left" size="huge" style={styles.leftButton} onClick={(ev) => this.handleGoToView(1)} />
                                                @{this.props.me.username}
                                                <ImgPreview />
                                                <Input name="desc" placeholder="Descripción" onChange={this.handleInputDesc} defaultValue={desc}/>
                                                <Button onClick={this.handleSave}>Publicar</Button>
                                            </Fragment>
                                        )

                                    }



                                </Container>
                            </div>

                        )
                    }


                </Dimmer>
                <Button circular icon="plus" size="huge" style={styles.showDropzoneButton} onClick={this.handleShowDropzone} />


            </div>

        )
    }
}

export default compose(
    graphql(queries.mutation.singleUpload, { name: 'singleUpload' }),
    graphql(queries.mutation.createPost, { name: 'createPost' }),
)(UploapFile)

const styles = {
    divPr: {
        overflow: 'auto',
    },
    dropzoneContainer: {
        background: "white",
        color: "#333",
        padding: "10px",
        //position: "absolute",
        //   top: "30%",
        //   left: "40%",

    },
    previewDiv: {
        display: "inline-block",
        padding: "10px",
        background: "white",
        color: "black",
        position: "relative",
    },
    divFigure: {
        display: "inline-block",
        cursor: "pointer",
    },
    figure: {
        margin: "5px",
    },
    divFilters: {
        height: '200px',
        overflow: 'auto',
    },
    h4: {
        color: "black",
        marginBottom: 0,
    },
    previewFigure: {
        display: "inline-block"
    },
    showDropzoneButton: {
        position: "fixed",
        bottom: "10px",
        right: "10px"
    },
    rightButton: {
        position: "absolute",
        top: "10px",
        right: "10px"
    },
    leftButton: {
        position: "absolute",
        top: "10px",
        right: "10px"
    }
}