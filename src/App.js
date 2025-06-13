import React, { useState } from 'react';

const kategoriGejala = {
  "Kondisi Pernapasan": ["napas berat", "sesak napas", "nafas ringan"],
  "Kondisi Hidung": ["hidung tersumbat", "hidung gatal"],
  "Suhu Tubuh": ["suhu normal", "demam ringan", "demam tinggi"],
  "Kondisi Kulit": ["tidak ada perubahan", "ruam"],
  "Kondisi Mata": ["mata normal", "mata merah", "mata sembab", "mata berair", "mata gatal"]
};

const rules = [
  {
    penyakit: "COVID-19",
    kondisi: {
      "Kondisi Pernapasan": "sesak napas",
      "Kondisi Hidung": "hidung tersumbat",
      "Suhu Tubuh": "demam tinggi",
      "Kondisi Kulit": "ruam",
      "Kondisi Mata": "mata merah"
    }
  },
  {
    penyakit: "Flu",
    kondisi: {
      "Kondisi Pernapasan": "napas berat",
      "Kondisi Hidung": "hidung tersumbat",
      "Suhu Tubuh": "demam ringan",
      "Kondisi Kulit": "tidak ada perubahan",
      "Kondisi Mata": "mata berair"
    }
  },
  {
    penyakit: "Pilek",
    kondisi: {
      "Kondisi Pernapasan": "napas berat",
      "Kondisi Hidung": "hidung tersumbat",
      "Suhu Tubuh": "suhu normal",
      "Kondisi Kulit": "tidak ada perubahan",
      "Kondisi Mata": "mata berair"
    }
  },
  {
    penyakit: "Alergi (Bersin)",
    kondisi: {
      "Kondisi Pernapasan": "nafas ringan",
      "Kondisi Hidung": "hidung gatal",
      "Suhu Tubuh": "suhu normal",
      "Kondisi Kulit": "ruam",
      "Kondisi Mata": "mata gatal"
    }
  },
  {
    penyakit: "Sinusitis",
    kondisi: {
      "Kondisi Pernapasan": "nafas berat",
      "Kondisi Hidung": "hidung tersumbat",
      "Suhu Tubuh": "demam ringan",
      "Kondisi Kulit": "tidak ada perubahan",
      "Kondisi Mata": "mata sembab"
    }
  },
  {
    penyakit: "Bronkitis",
    kondisi: {
      "Kondisi Pernapasan": "sesak napas",
      "Kondisi Hidung": "hidung tersumbat",
      "Suhu Tubuh": "demam ringan",
      "Kondisi Kulit": "tidak ada perubahan",
      "Kondisi Mata": "mata normal"
    }
  },
  {
    penyakit: "Asma Alergi",
    kondisi: {
      "Kondisi Pernapasan": "sesak napas",
      "Kondisi Hidung": "hidung tersumbat",
      "Suhu Tubuh": "suhu normal",
      "Kondisi Kulit": "ruam",
      "Kondisi Mata": "mata normal"
    }
  }
];

function App() {
  const [inputGejala, setInputGejala] = useState({});
  const [hasilDiagnosa, setHasilDiagnosa] = useState([]);

  const handleChange = (kategori, value) => {
    setInputGejala({ ...inputGejala, [kategori]: value });
  };

  const hitungDiagnosa = () => {
    let hasil = [];

    rules.forEach(rule => {
      let total = Object.keys(rule.kondisi).length;
      let cocok = 0;

      for (let kategori in rule.kondisi) {
        if (inputGejala[kategori] === rule.kondisi[kategori]) {
          cocok++;
        }
      }

      if (cocok > 0) {
        let persen = Math.round((cocok / total) * 100);
        hasil.push({ penyakit: rule.penyakit, persen });
      }
    });

    hasil.sort((a, b) => b.persen - a.persen);
    setHasilDiagnosa(hasil);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#D6F3F4',
      fontFamily: '"Raleway", sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        maxWidth: '620px',
        width: '100%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '2px solid #508991'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontFamily: '"Playfair Display", serif',
          textAlign: 'center',
          marginBottom: '30px',
          color: '#004346'
        }}>
          Sistem Pakar Diagnosa Penyakit Pernapasan
        </h2>

        {Object.entries(kategoriGejala).map(([kategori, opsi]) => (
          <div key={kategori} style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '18px', fontWeight: '600', color: '#004346' }}>{kategori}</label><br />
            <select
              onChange={(e) => handleChange(kategori, e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #508991',
                backgroundColor: '#ffffff',
                fontFamily: '"Raleway", sans-serif'
              }}
              defaultValue=""
            >
              <option value="" disabled>Pilih gejala</option>
              {opsi.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        ))}

        <button
          onClick={hitungDiagnosa}
          style={{
            marginTop: '30px',
            width: '100%',
            padding: '14px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#74B3CE',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: '"Raleway", sans-serif'
          }}
        >
          Diagnosa Sekarang
        </button>

        {hasilDiagnosa.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#172A3A',
              fontFamily: '"Playfair Display", serif'
            }}>
              Hasil Diagnosa:
            </h3>
            <ul style={{ fontSize: '18px', color: '#172A3A' }}>
              {hasilDiagnosa.map((h, i) => (
                <li key={i}>{h.penyakit}: {h.persen}%</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
