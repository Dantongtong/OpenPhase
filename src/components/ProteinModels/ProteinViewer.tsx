import React, { useEffect, useRef, useState } from "react";

const proteins = [
  {
    PID: "p0001",
    name: "LAF-1",
    uniprot: "D0PV95",
    localization: "Cytoplasm",
    type: "N",
    pdb: "6VXX", 
    sequence:
      "MGKKTKRTADSSSSEDEEEYVVEKVLDRRVVKGQVEYLLKWKGFSEEHNTWEPEKNLDCPELISEFMKKYKKMKEGENNKPREKSESNKRKSNFSNSADDIKSKKKREQSNDIARGFERGLEPEKIIGATDSCGDLMFLMKWKDTDEADLVLAKEANVKCPQIVIAFYEERLTWHAYPEDAENKEKETAKS",
  },
  {
    PID: "p0002",
    name: "FUS",
    uniprot: "P35637",
    localization: "Cytoplasm",
    type: "N",
    pdb: "5yvg",
    sequence:
      "GSMASNDYTQQATQSYGAYPTQPGQGYSQQSSQPYGQQSYSGYSQSTDTSGYGQSSYSSYGQSQNTGYGTQSTPQGYGSTGGYGSSQSSQSSYGQQSSYPGYGQQPAPSSTSGSYGSSSQSSSYGQPQSGSYSQQPSYGGQQQSYGQQQSYNPPQGYGQQNQYNSSSGGGGGGGGGGNYGQDQSSMSSGGGSGGGYGNQDQSGGGGSGGYGQQDRGGRGRGGSGGGGGGGGGGYNRSSGGYEPRGRGGGRGGRGGMGGSDRGGFNKFGGPRDQGSRHDSEQDNSDNNTIFVQGLGENVTIESVADYFKQIGIIKTNKKTGQPMINLYTDRETGKLKGEATVSFDDPPSAKAAIDWFDGKEFSGNPIKVSFATRRADFNRGGGNGRGGRGRGGPMGRGGYGGGGSGGGGRGGFPSGGGGGGGQQRAGDWKCPNPTCENMNFSWRNECNQCKAPKPDGPGGGPGGSHMGGNYGDDRRGGRGGYDRGGYRGRGGDRGGFRGGRGGGDRGGFGPGKMDSRGEHRQDRRERPY",
  },
  {
    PID: "p0003",
    name: "Whi3",
    uniprot: "Q75E28",
    localization: "",
    type: "N",
    pdb: "1n52", 
    sequence:
      "MSLVNSHSSASVENAAYNLHRAFSSSTENVGHMTPSNSSPLHHSTVVAMGAESQGGGASNNNNNPANPGSTANNNSNNVNMNSIGGGASLGAGSGATGSISGTKGMNNSHSPLHIATMLNTLSMNSNPPSQQQSNVQGPYLVRLQNVPKDTTLRECHALFALAHGVLSIELSSFQQYAERSQTSGQESTNYIVAKFDSLHLACQYATILDEKAQIFGPSFPFKTYVEVVDELTQQQIPFQTQMQMHQGSPPAPTHVTAYQQPLLSASGVVSPPQSASSVKRPSLLVQRSRFSFTDPFSSEQTNMGSQQPDLITTPLKGHQDTGKSFLLMESDEINDSIWGNGTGIPSSISGLTTSQPPTPHLEWGTTGRRQSSTFYPSQSNTEIPPMHLTGQVQSSQLATGLQQPLPQPQRQSLSYNLVTPLSSDMNLPPQSSQGGILPHQAPAQTQPQSQALQHHQHLHHQQQQLQQQQHHLQQQQHQQQQQSLSQQPQQQQSQQSQAHSQQHQQQHQQQQQQQQPQQQQPQQHPPQQPQQQNSQQAIVGQSQQQVTSGQQKGSSRNSISKTLQVNGPKNAAAALQNTNGISQVDLSLLAKVPPPANPADQNPPCNTLYVGNLPPDATEQELRQLFSSQKGFRRLSFRNKNNNGNGHGPMCFVEFEDVAHATRALAELYGSQLARTSGTHNNKGGIRLSFSKNPLGVRGPNSRRGGATNNTSNAGTTNYSYAAAFGKS",
  },
  {
    PID: "p0004",
    name: "Pub1",
    uniprot: "P32588",
    localization: "Cytoplasm, Nucleus",
    type: "N",
    pdb: "3md1", 
    sequence:
      "TFNLFVGDLNVNVDDETLRNAFKDFPSYLSGHVMWDMQTGSSRGYGFVSFTSQDDAQNAMDSMQGQDLNGRPLRINWAAKLEH",
  },
];

export default function ProteinViewer() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [sequence, setSequence] = useState(proteins[0].sequence);

  useEffect(() => {
    if (!window.$3Dmol) {
      const script = document.createElement("script");
      script.src = "https://3Dmol.csb.pitt.edu/build/3Dmol-min.js";
      script.async = true;
      script.onload = () => renderProtein(selected);
      document.body.appendChild(script);
    } else {
      renderProtein(selected);
    }
    // eslint-disable-next-line
  }, []);

  // 切换蛋白时渲染
  useEffect(() => {
    setSequence(proteins[selected].sequence);
    if (window.$3Dmol) {
      renderProtein(selected);
    }
    // eslint-disable-next-line
  }, [selected]);

  function renderProtein(idx: number) {
    if (!window.$3Dmol || !viewerRef.current) return;
    const protein = proteins[idx];

    // 清除上一个 viewer，重新渲染
    viewerRef.current.innerHTML = ""; // 保证不重复挂载
    const viewer = window.$3Dmol.createViewer(viewerRef.current, {
      backgroundColor: "white",
    });

    if (protein.pdb) {
      window.$3Dmol.download(
        `pdb:${protein.pdb}`,
        viewer,
        {},
        function () {
          // cartoon 默认灰色
          viewer.setStyle({}, { cartoon: { color: "lightgray" } });

          // localization 上色
          if (protein.localization.includes("Nucleus")) {
            viewer.setStyle({}, { cartoon: { color: "blue" } });
          } else if (protein.localization.includes("Cytoplasm")) {
            viewer.setStyle({}, { cartoon: { color: "green" } });
          }

          // type 上色
          if (protein.type === "D") {
            viewer.setStyle({}, { cartoon: { color: "red" } });
          }

          viewer.zoomTo();
          viewer.render();
        }
      );
    } else {
      // 没有PDB时
      viewer.addLabel("No structure available", {
        fontSize: 24,
        position: { x: 0, y: 0, z: 0 },
      });
      viewer.render();
    }
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <div
        id="viewer"
        ref={viewerRef}
        className="viewer-canvas"
        style={{
          width: 800,
          height: 500,
          position: "relative",
          overflow: "hidden",
          border: '1px solid black'
        }}
      />
      <div style={{ marginTop: 20 }}>
        <label htmlFor="proteinSelect">Select a protein:</label>
        <select
          id="proteinSelect"
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
          style={{ marginLeft: 10 }}
        >
          {proteins.map((p, i) => (
            <option value={i} key={p.PID}>
              {p.name} ({p.PID})
            </option>
          ))}
        </select>
      </div>
      <h3 style={{ marginTop: 30 }}>Sequence:</h3>
      <textarea
        id="sequence"
        readOnly
        value={sequence}
        style={{ width: 800, height: 100 }}
      />
    </div>
  );
}

// 全局声明window.$3Dmol，避免TS报错
declare global {
  interface Window {
    $3Dmol?: any;
  }
}
