import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { addDataToAPI } from '../redux/action'
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
import swal from 'sweetalert';
import axios from 'axios';

export default class TambahBuku extends Component {
    constructor(props) {
        super(props);

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            produks: [],
            user: {},
            newProdukData: {
                nama_barang: "",
                gambar: "",
                jenis_barang: "",
                harga: "",
            },
        }

    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user
                })
                console.log("User adalah : " + user.email)
            }
            else {
                this.setState({
                    user: null
                })
            }
        })
    }

    onChangeAddProdukHandler = (e) => {
        let { newProdukData } = this.state;
        newProdukData[e.target.name] = e.target.value;
        this.setState({ newProdukData });
        console.log(this.state);
    };

    addProduk = () => {
        axios
            .post(
                "http://localhost:8000/api/create-produk",
                this.state.newProdukData
            )
            .then((response) => {
                const { produks } = this.state;
                const newProduks = [...produks];
                newProduks.push(response.data);
                this.setState(
                    {
                        newProdukData: {
                            nama_barang: "",
                            gambar: "",
                            jenis_barang: "",
                            harga: "",
                        },
                    },
                    // () => this.getProduk()
                );
                swal("Berhasil!", "Data Berhasil ditambahkan!", "success");
            });
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
                                    <h1>Form Tambah Barang</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"> <Link to="/">Home</Link> </li>
                                        <li className="breadcrumb-item"> <Link to="/databuku">Data Barang</Link> </li>
                                        <li className="breadcrumb-item active">Tambah Barang</li>
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
                                    <div className="card card-info">
                                        <div className="card-header">
                                            <h3 className="card-title">Tambahkan Data Barang</h3>
                                        </div>
                                        {/* /.card-header */}
                                        {/* form start */}
                                        {/* <form > */}
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Nama Barang</label>
                                                    <input type="text" className="form-control" id="nama_barang" name="nama_barang" onChange={this.onChangeAddProdukHandler} placeholder="Masukkan nama barang" value={this.state.newProdukData.nama_barang}/>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Jenis Barang</label>
                                                    <input type="text" className="form-control" id="jenis_barang" name="jenis_barang" onChange={this.onChangeAddProdukHandler} placeholder="Masukan jenis barang" value={this.state.newProdukData.jenis_barang}/>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Harga</label>
                                                    <input type="text" className="form-control" id="harga" name="harga" onChange={this.onChangeAddProdukHandler} placeholder="Masukan harga" value={this.state.newProdukData.harga} />
                                                </div>
                                               
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Gambar</label>
                                                    <input type="text" className="form-control" id="gambar" name="gambar" onChange={this.onChangeAddProdukHandler} placeholder="Masukkan gambar" value={this.state.newProdukData.gambar} />
                                                </div>  
                                            </div>
                                            {/* /.card-body */}
                                            <div className="card-footer">
                                                <button className="btn btn-info" onClick={() => this.addProduk()}>Submit</button>
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