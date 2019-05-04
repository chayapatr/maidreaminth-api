# MaidreaminTH-API
#### วันที่ 4 พฤษภาคม 2562 ณ Maidreamin, ชั้น 7 MBK Center

>@wit03: (อะไรซักอย่าง จำไม่ได้) ร้านนี้มี api ป่าววะ55

>@chayapatr: ไม่น่ามีมั้ง

>@wit03: งั้นเขียนเลยมั้ย

>@chayapatr: *กางคอม*

>@aomkirby123: ไม่ได้เอาคอมมาง่ะ;-;

---

## ตัวอย่างการใช้

```
// With Fetch
fetch("https://maidreamin.now.sh/menu/appetizer/arabaki%20sausage")
.then(res => res.json())
.then(data => {
    // fetched data
})
```

```
// With Axios
Axios("https://maidreamin.now.sh/menu/appetizer/arabaki%20sausage")
.then(data => {
    // fetched data
});
```

## Endpoint
- /menu | ข้อมูลอาหารทั้งหมด
- /menu/:category | ข้อมูลอาหารตามหมวดหมู่
- /menu/:category/:food | ข้อมูลอาหารรายชนิด

- / | ( ͡° ͜ʖ ͡°)
