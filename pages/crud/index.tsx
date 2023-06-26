import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";
import Link from "next/link";
 
 const koneksiTelkom = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/pelanggan_telkom" 
});

export default function FormTelkom() {
    const [statenama, setNama] = useState("");
    const [stateid, setId] = useState("");
    const [statetanggal, setTanggal] = useState("2018-07-22");
    const [statealamat, setAlamat] = useState("");
    const [statefoto, setFoto] = useState("");
    const [stateproduk, setProduk] = useState("");
    const [stateharga, setHarga] = useState("");
    const [pelanggan_telkom, setPelanggan_telkom] =  useState(null);
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
     
    const [stateedit,setEdit]=useState("hide");

     
    
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
   
  const handleSubmitAdd =  (event) => {
    
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiTelkom
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
     
 }
 const handleSubmitEdit =  (event) => {
    
  event.preventDefault();
  const address = "/"+event.target.id.value;
  alert(address);
  //const formData = new FormData(event.target);
  const formData = {
    id: event.target.id.value,
    nama: event.target.nama.value,
    alamat: event.target.alamat.value,
    tanggal_order: event.target.tanggal_order.value,
    produk: event.target.produk.value,
    harga: event.target.harga.value
}
  alert(formData);
  koneksiTelkom
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}
  const handleAdd = (event) => {
    
     setAdd("show");
     setbtnAdd("hide");
     setEdit("hide");
 
      
  }
  const handleCancelAdd = (event) => {
    
     setAdd("hide");
     setbtnAdd("show");
     setEdit("hide");
 
      
  }
  const handleCancelEdit = (event) => {
    
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
    setNama("");
    setId("");
    setAlamat("");
    setProduk("");
    setHarga("");
    setTanggal(formatDate("2018-07-22"));
    setFoto("");
     
 }
   const handleDelete = (event) => {
            event.preventDefault();
            var id = event.target.value;
            koneksiTelkom.delete(`/${id}`)
              .then(response => {
                console.log('Data berhasil dihapus:', response.data);
                setPelanggan_telkom(
                  pelanggan_telkom.filter((pelanggan_telkom) => {
                     return pelanggan_telkom.id !== id;
                  }))
             
                // Lakukan langkah-langkah lain setelah penghapusan data
              })
              .catch(error => {
                console.error('Gagal menghapus data:', error);
              })
          }

      const handleEdit = (event) => {
            event.preventDefault();
            var id = event.target.value;
            
               const plgEdit =  pelanggan_telkom.filter((pelanggan_telkom) => {
                     return pelanggan_telkom.id == id;
                  });
                  if(plgEdit!=null){

                    setNama(plgEdit[0].nama);
                    setId(plgEdit[0].id);
                    setAlamat(plgEdit[0].alamat);
                    setTanggal(formatDate(plgEdit[0].tanggal_order));
                    setProduk(plgEdit[0].produk);
                    setHarga(plgEdit[0].harga);
                    setFoto(plgEdit[0].foto);
                    setAdd("hide");
                    setbtnAdd("hide");
                    setEdit("show");

                  }
          }
  useEffect(() => {
      async function getPelanggan_telkom() {
        const response = await koneksiTelkom.get("/").then(function (axiosResponse) {
            setPelanggan_telkom(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from pelanggan_telkom in api pelanggan_telkom: '+error);
         });;
          }
      getPelanggan_telkom();
    }, []);
  
   
if(pelanggan_telkom==null){
return(
  <div>
    waiting...
  </div>
)
}else{

  return (
    <div>
      <center><br />
      <div className="logo">
        <div className="h2-sub">
        <h2 style={{backgroundColor:"red"}}>DATA LAYANAN PELANGGAN</h2>
        <h2 style={{backgroundColor:"white", color:"red"}}>PT TELKOM INDONESIA TBK TAHUN 2023</h2>
        </div>
       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
        <table border={0}>
            <tbody>
            <tr>
            <td> <label> Id_Pelanggan:</label></td>
            <td><input type="text" id="id" name="id"/>
              
              </td>
        </tr>
        <tr>
            <td>  <label> Nama:</label></td>
            <td><input type="text" id="nama"   name="nama" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>   <input
                    type="file" name="image"/>  </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Order:</label></td>
            <td>  <input type="date" name="tanggal_order"
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}}  name="alamat" ></textarea></td>
        </tr>
        <tr>
            <td>  <label> Produk:</label></td>
            <td><input type="text" id="produk"   name="produk" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Harga:</label></td>
            <td><input type="text" id="harga"   name="harga" 
               /></td>
        </tr>
            </tbody>
          </table><br />
          <input type="submit" />
          <input type="button" value="cancel" onClick={handleCancelAdd} />
          </form>  
      <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>
 
          <table border={0}>
            <tbody>
            <tr>
            <td> <label> Id_Pelanggan:</label></td>
            <td><input type="text" id="id"  value={stateid} name="id"/>
              {/* onChange={handleOnchangeid}  /> */}
              </td>
        </tr>
        <tr>
            <td>  <label> nama:</label></td>
            <td><input type="text" id="nama"  value={statenama} name="nama"
               onChange={(e) => setNama(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>  <img src={statefoto} width="80"/> </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Order:</label></td>
            <td>  <input type="date" value={statetanggal} name="tanggal_order"  onChange={(e) => setTanggal(e.target.value)}
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}} value={statealamat} name="alamat"  onChange={(e) => setAlamat(e.target.value)}></textarea></td>
        </tr>
        <tr>
            <td>  <label> Produk:</label></td>
            <td><input type="text" id="produk" style={{resize: "none"}} value={stateproduk} name="produk"  onChange={(e) => setProduk(e.target.value)} /></td>
        </tr>
        <tr>
            <td>  <label> Harga:</label></td>
            <td><input type="text" id="harga" style={{resize: "none"}} value={stateharga} name="harga" onChange={(e) => setHarga(e.target.value)}
               /></td>
        </tr>
            </tbody>
          </table>
          <br />
          <input type="submit" />
          <input type="button" value="cancel" onClick={handleCancelEdit} />
          </form>  
        <br/>
        <br/>
        <button style={{backgroundColor:"green",color:"white",padding:"3px",borderRadius:"8px"}} id="btnadd" onClick={handleAdd} className={statebutonadd}>Tambah Data</button><br /><br />
        <table style={{width:"70%"}} border={6}>
            <thead>
                <tr style={{textAlign:"center",backgroundColor:"red",color:"white"}}>
                <td><b>ID Pelanggan</b></td> 
                <td><b>Nama Pelanggan</b></td>
                <td><b>Logo</b></td>
                <td><b>Tanggal Kontrak</b></td>
                <td><b>Alamat</b></td>
                <td><b>Layanan</b></td>
                <td><b>Nilai Kontrak</b></td>
                <td colSpan={2}><b>Action</b></td>
                </tr>
            </thead>
            <tbody style={{backgroundColor:"white"}}>
            {pelanggan_telkom.map((plg) => 
                <tr style={{textAlign:"center"}}>
                    <td>{plg.id}</td>
                    <td>{plg.nama}</td>
                    <td><img src={plg.foto} width="80"/></td>
                    <td>{plg.tanggal_order}</td>
                    <td>{plg.alamat}</td>
                    <td>{plg.produk}</td>
                    <td>{plg.harga}</td>
                   <td><button style={{backgroundColor:"orange",color:"black",padding:"3px",borderRadius:"8px"}} onClick={handleEdit} value={plg.id}>edit</button></td>
                   <td><button style={{backgroundColor:"red",color:"white",padding:"3px",borderRadius:"8px"}} onClick={handleDelete} value={plg.id}>delete</button></td>
                </tr>
           )}     
                   </tbody>
          </table>
          </div>
          </center>
          </div>
        )
}
  
  }
