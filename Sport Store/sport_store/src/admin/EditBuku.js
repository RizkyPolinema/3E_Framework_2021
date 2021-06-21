import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
import axios from 'axios';
import swal from 'sweetalert';

class EditBuku extends Component {

    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            produks: [],
            user: {},
            editProdukData: {
                id: "",
                nama_bunga: "",
                gambar: "",
                jenis_bunga: "",
                harga: "",
            },
        }
    }


    componentDidMount() {
        this.getProduk();
    }

    getProduk() {
        axios.get("http://localhost:8000/api/produk/"+this.props.location.param1).then((response) => {
            if (response.status === 200) {
                this.setState({
                    editProdukData: response.data.data ? response.data.data : [],
                });
                console.log(this.state);
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    }

    updateProduk = () => {
        let {
            id,
            nama_barang,
            gambar,
            jenis_barang,
            harga,
        } = this.state.editProdukData;
        axios
            .post("http://localhost:8000/api/create-produk", {
                nama_barang,
                gambar,
                jenis_barang,
                harga,
                id,
            })
            .then((response) => {
                swal("Berhasil!", "Data berhasil diedit!", "success");
                // this.setState({
                    // editProdukData: { nama_bunga, gambar, jenis_bunga, harga },
                // });
                this.props.history.push('/databarang')
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.log(error.response);
            });
    };

    onChangeEditProdukHanler = (e) => {
        let { editProdukData } = this.state;
        editProdukData[e.target.name] = e.target.value;
        this.setState({ editProdukData });
        console.log(this.state);
    };

    render() {
        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Form Edit Buku</h1>
                                    <h1>id: {this.props.location.param1}</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"> <Link to="/">Home</Link> </li>
                                        <li className="breadcrumb-item"> <Link to="/databuku">Data Buku</Link> </li>
                                        <li className="breadcrumb-item active">Edit Buku</li>
                                    </ol>
                                </div>
                            </div>
                        </div>{/* /.container-fluid */}
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-2"></div>
                                {/* left column */}
                                <div className="col-md-8">
                                    {/* general form elements */}
                                    <div className="card card-warning">
                                        <div className="card-header">
                                            <h3 className="card-title">Edit Data Buku</h3>
                                        </div>
                                        {/* /.card-header */}
                                        {/* form start */}
                                        {/* <form role="form"> */}
                                        <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Nama Barang</label>
                                                    <input type="text" className="form-control" id="nama_barang" name="nama_barang" onChange={this.onChangeEditProdukHanler} placeholder="Masukkan nama barang" value={this.state.editProdukData.nama_barang}/>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Jenis Barang</label>
                                                    <input type="text" className="form-control" id="jenis_barang" name="jenis_barang" onChange={this.onChangeEditProdukHanler} placeholder="Masukan jenis barang" value={this.state.editProdukData.jenis_barang}/>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Harga</label>
                                                    <input type="text" className="form-control" id="harga" name="harga" onChange={this.onChangeEditProdukHanler} placeholder="Masukan harga" value={this.state.editProdukData.harga} />
                                                </div>
                                               
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Gambar</label>
                                                    <input type="text" className="form-control" id="gambar" name="gambar" onChange={this.onChangeEditProdukHanler} placeholder="Masukkan gambar" value={this.state.editProdukData.gambar} />
                                                </div>  
                                            </div>
                                            {/* /.card-body */}
                                            <div className="card-footer">
                                                <button className="btn btn-info" onClick={() => this.updateProduk()}>Submit</button>
                                            </div>
                                        {/* </form> */}
                                    </div>
                                    {/* /.card */}
                                </div>
                            </div>
                            {/* /.row */}
                        </div>{/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        idBuku: state.idBuku
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleId: (cek) => dispatch({ type: 'ADD_IDBUKU', newValue: cek })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBuku));