import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase';
import firebaseConfig from '../firebase/firebaseConfig';
import PostDataBarang from './Post/postDataBarang';
import { connect } from 'react-redux';
import axios from 'axios';

class DataBuku extends Component {
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        // this.login = this.login.bind(this);
        // this.handleChange = this.handleChange.bind(this);

        this.state = {
            produks: [],
            newProdukData: {
                nama_barang: "",
                gambar: "",
                jenis_barang: "",
                harga: "",
            },
            editProdukData: {
                id: "",
                nama_barang: "",
                gambar: "",
                jenis_barang: "",
                harga: "",
            },
            user: {},
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

    componentDidMount() {
        this.authListener();
        this.getProduk();
    }

    getProduk() {
        axios.get("http://localhost:8000/api/produks").then((response) => {
            if (response.status === 200) {
                this.setState({
                    produks: response.data.data ? response.data.data : [],
                });
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

    deleteProduk = (id) => {
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:8000/api/produk/" + id)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getProduk();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        var no = 0;
        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Data Barang</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"> <Link to="/">Home</Link> </li>
                                        <li className="breadcrumb-item active">Data Barang</li>
                                    </ol>
                                </div>
                            </div>
                        </div>{/* /.container-fluid */}
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">
                                            <Link to="/databarang/tambah">
                                                <a href="Tambah" class="btn btn-info">+ Tambah</a>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>ID Barang</th>
                                                    <th>Nama Barang</th>
                                                    <th>Jenis Barang</th>
                                                    <th>Harga</th>
                                                    <th>Gambar</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.produks.map(produk => {
                                                    no += 1;
                                                    return (
                                                        <PostDataBarang
                                                            no={no}
                                                            key={produk.id}
                                                            id={produk.id}
                                                            nama_barang={produk.nama_barang}
                                                            harga={produk.harga}
                                                            gambar={produk.gambar}
                                                            jenis_barang={produk.jenis_barang}
                                                            hapus={this.deleteProduk}
                                                        />
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </section>
                    {/* /.content */}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        idBook: state.idBuku
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleId: (cek) => dispatch({ type: 'ADD_IDBUKU', newValue: cek })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataBuku);