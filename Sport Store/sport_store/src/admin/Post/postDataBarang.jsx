import React from 'react'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const PostDataBuku = (brg) => {

    const newTo = {
        pathname: '/databarang/edit',
        param1: brg.id
    }

    return (
        <tr>
            <td align="center">{brg.no}</td>
            <td align="center">{brg.id}</td>
            <td align="center">{brg.nama_barang}</td>
            <td align="center">{brg.jenis_barang}</td>
            <td align="center">{brg.harga}</td>
            
            <td align="center"><img id="gambar-dataBuku" src={brg.gambar} alt="gambar" /></td>
            <td align="center">
                {/* <Link to="/databuku/edit"> */}
                    <button class="btn btn-warning">
                        <Link style={{color:"white"}} to={newTo}>
                            Edit
                        </Link>    
                    </button>
                {/* </Link> */}
                <br></br>
                <button class="btn btn-danger" onClick={() => {brg.hapus(brg.id); console.log(brg.id)}} >Hapus</button>
            </td>
        </tr>
    )
}

export default PostDataBuku;