import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./styles.css"
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import Data from './Data/data.json';
import image from "./bg.png";
import "./components/Dropzone/Dropzone.css"

import { RiMedicineBottleLine } from "react-icons/ri";
import { CiMemoPad } from "react-icons/ci";
import { TbCapture } from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa";


const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7b',
    },
  },
}))(Button);
const axios = require("axios").default;


function CustomIcon(SvgIconProps) {
  return null;
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  root1: {
    backgroundColor: 'transparent',
    color: 'inherit',
    border: 'none',
    boxShadow: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundRepeat: 'x-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: 'transparent',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: { 
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'black !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'left',
  },
  content:{
    margin: "20px",
    border: "3px purple dashed"
  },
  logo :{
    height:100,
    width:100,
    padding:'0'
  },
  appbar: {
    background: '#3b9460',
    boxShadow: 'none',
    color: 'white'
  },
  loader: {
    color: '#be6a77 !important',
  }
}));
export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;
  var disease;

  
  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
    setShowinfo(false)
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
    disease = data.class;
  }

  const [isShowInfo, setShowinfo] = useState(false);
  const getInfoHandler = ()=>{
    setShowinfo(true);
  }

console.log(preview)
  return (
    <React.Fragment>
      {/* <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Tomato Disease Classification
          </Typography>
          <div className={classes.grow} />
          <Avatar className={classes.logo}  src={cblogo} />
        </Toolbar>
      </AppBar> */}
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            {!isShowInfo && (<Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
              {image && <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={preview}
                  component="image"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
              }
              {!image &&  
              <CardContent className={classes.content}>
              <DropzoneArea
                      classes={{ root: classes.root1 }}
                      acceptedFiles={["image/*"]}
                      dropzoneText={""}
                      onChange={onSelectFile}
                      IconComponent={null}
                    />
                    <div className="dropzone-div">
                      <div className="dropzone-content icon-container">
                        <div>
                          <TbCapture size={50} />
                          <p>Take a Picture</p>
                        </div>
                        <div className="arrow">
                          <FaChevronRight size={30} />
                        </div>
                        <div>
                          <CiMemoPad size={50} />
                          <p>See Diagnosis</p>
                        </div>
                        <div className="arrow">
                          <FaChevronRight size={30} />
                        </div>
                        <div>
                          <RiMedicineBottleLine size={50} />
                          <p>Get Medicine</p>
                        </div>
                      </div>
                      <p>You can Drag and Drop image in this Box</p>
                    </div>
                  </CardContent>}
              {(data && !isShowInfo)&&
              <CardContent className={classes.detail}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                      <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell1}>Disease:</TableCell>
                        <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      <TableRow className={classes.tableRow}>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                          {data.class}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>}
              {isLoading && <CardContent className={classes.detail}>
                <CircularProgress color="secondary" className={classes.loader} />
                <Typography className={classes.title} variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>}
            </Card>)}
          </Grid>
          {(data && isShowInfo) &&
             <div className="app">
             {Data.map((post) => {
              if (post.name === disease){

                return (
                  <div className="details">
                    <div className="big-img">
                      <img src={preview} alt="" />
                    </div>
                    <div className="box">
                      <div className="row">
                        <h2> {post.name}</h2>
                      </div>
                      <h3 className="row">Symptoms</h3>
                      <p>{post.symptoms}</p>
                    </div>
                    <div className="info">
                      <h3 className="row">What Caused it?</h3>
                      <p> {post.causes}</p>
                      <h3 className="row">Organic Control</h3>
                      <p>{post.organic_control}</p>
                      <h3 className="row">Chemical Control</h3>
                      <p> {post.chemical_control}</p>
                      <h3 className="row">Measures</h3>
                      <>
                        <ul>
                          {post.measures.map((m) => {
                            return <li key={m}>{m}</li>;
                          })}
                        </ul>
                      </>
                    </div>
                  </div>
                );
              }
             })}
           </div>
          }
          {data &&
            <Grid item className={classes.buttonGrid} >
              <ColorButton variant="contained"  className={classes.clearButton} color="primary" component="span" size="large" onClick={getInfoHandler} startIcon={<Clear fontSize="large" />}>
                More Info
              </ColorButton>

              <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                Clear
              </ColorButton>
            </Grid>}
        </Grid >
      </Container >
    </React.Fragment >
  );
};