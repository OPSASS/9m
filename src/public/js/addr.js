var citis = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");
var Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/21dd295d2af39742fcfab4d25aa159a3fa2fc679/data.json"
};
//gọi ajax = axios => trả về promise
var promise = axios(Parameter);
//Xử lý khi request thành công
promise.then(function(result) {
    renderCity(result.data);
});

function renderCity(data) {
    for (const x of data) {
        citis.options[citis.options.length] = new Option(x.Name);
    }

    // xứ lý khi thay đổi tỉnh thành thì sẽ hiển thị ra quận huyện thuộc tỉnh thành đó
    citis.onchange = function() {
        district.length = 1;
        ward.length = 1;
        if (this.value != "") {
            const result = data.filter(n => n.Name === this.value);
            for (const k of result[0].Districts) {
                district.options[district.options.length] = new Option(k.Name);
            }
        }
    };

    // xứ lý khi thay đổi quận huyện thì sẽ hiển thị ra phường xã thuộc quận huyện đó
    district.onchange = function() {
        ward.length = 1;
        const dataCity = data.filter((n) => n.Name === citis.value);
        if (this.value != "") {
            const dataWards = dataCity[0].Districts.filter(n => n.Name === this.value)[0].Wards;
            for (const w of dataWards) {
                wards.options[wards.options.length] = new Option(w.Name);
            }
        }
    };
}