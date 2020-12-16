const table = new Uint32Array([
    0,
    1996959894,
    3993919788,
    2567524794,
    124634137,
    1886057615,
    3915621685,
    2657392035,
    249268274,
    2044508324,
    3772115230,
    2547177864,
    162941995,
    2125561021,
    3887607047,
    2428444049,
    498536548,
    1789927666,
    4089016648,
    2227061214,
    450548861,
    1843258603,
    4107580753,
    2211677639,
    325883990,
    1684777152,
    4251122042,
    2321926636,
    335633487,
    1661365465,
    4195302755,
    2366115317,
    997073096,
    1281953886,
    3579855332,
    2724688242,
    1006888145,
    1258607687,
    3524101629,
    2768942443,
    901097722,
    1119000684,
    3686517206,
    2898065728,
    853044451,
    1172266101,
    3705015759,
    2882616665,
    651767980,
    1373503546,
    3369554304,
    3218104598,
    565507253,
    1454621731,
    3485111705,
    3099436303,
    671266974,
    1594198024,
    3322730930,
    2970347812,
    795835527,
    1483230225,
    3244367275,
    3060149565,
    1994146192,
    31158534,
    2563907772,
    4023717930,
    1907459465,
    112637215,
    2680153253,
    3904427059,
    2013776290,
    251722036,
    2517215374,
    3775830040,
    2137656763,
    141376813,
    2439277719,
    3865271297,
    1802195444,
    476864866,
    2238001368,
    4066508878,
    1812370925,
    453092731,
    2181625025,
    4111451223,
    1706088902,
    314042704,
    2344532202,
    4240017532,
    1658658271,
    366619977,
    2362670323,
    4224994405,
    1303535960,
    984961486,
    2747007092,
    3569037538,
    1256170817,
    1037604311,
    2765210733,
    3554079995,
    1131014506,
    879679996,
    2909243462,
    3663771856,
    1141124467,
    855842277,
    2852801631,
    3708648649,
    1342533948,
    654459306,
    3188396048,
    3373015174,
    1466479909,
    544179635,
    3110523913,
    3462522015,
    1591671054,
    702138776,
    2966460450,
    3352799412,
    1504918807,
    783551873,
    3082640443,
    3233442989,
    3988292384,
    2596254646,
    62317068,
    1957810842,
    3939845945,
    2647816111,
    81470997,
    1943803523,
    3814918930,
    2489596804,
    225274430,
    2053790376,
    3826175755,
    2466906013,
    167816743,
    2097651377,
    4027552580,
    2265490386,
    503444072,
    1762050814,
    4150417245,
    2154129355,
    426522225,
    1852507879,
    4275313526,
    2312317920,
    282753626,
    1742555852,
    4189708143,
    2394877945,
    397917763,
    1622183637,
    3604390888,
    2714866558,
    953729732,
    1340076626,
    3518719985,
    2797360999,
    1068828381,
    1219638859,
    3624741850,
    2936675148,
    906185462,
    1090812512,
    3747672003,
    2825379669,
    829329135,
    1181335161,
    3412177804,
    3160834842,
    628085408,
    1382605366,
    3423369109,
    3138078467,
    570562233,
    1426400815,
    3317316542,
    2998733608,
    733239954,
    1555261956,
    3268935591,
    3050360625,
    752459403,
    1541320221,
    2607071920,
    3965973030,
    1969922972,
    40735498,
    2617837225,
    3943577151,
    1913087877,
    83908371,
    2512341634,
    3803740692,
    2075208622,
    213261112,
    2463272603,
    3855990285,
    2094854071,
    198958881,
    2262029012,
    4057260610,
    1759359992,
    534414190,
    2176718541,
    4139329115,
    1873836001,
    414664567,
    2282248934,
    4279200368,
    1711684554,
    285281116,
    2405801727,
    4167216745,
    1634467795,
    376229701,
    2685067896,
    3608007406,
    1308918612,
    956543938,
    2808555105,
    3495958263,
    1231636301,
    1047427035,
    2932959818,
    3654703836,
    1088359270,
    936918000,
    2847714899,
    3736837829,
    1202900863,
    817233897,
    3183342108,
    3401237130,
    1404277552,
    615818150,
    3134207493,
    3453421203,
    1423857449,
    601450431,
    3009837614,
    3294710456,
    1567103746,
    711928724,
    3020668471,
    3272380065,
    1510334235,
    755167117
]);
function crc32(buffer) {
    let offset = 0;
    let crc = 4294967295;
    while(offset < buffer.length - 4){
        crc = table[(crc ^ buffer[offset++]) & 255] ^ crc >>> 8;
        crc = table[(crc ^ buffer[offset++]) & 255] ^ crc >>> 8;
        crc = table[(crc ^ buffer[offset++]) & 255] ^ crc >>> 8;
        crc = table[(crc ^ buffer[offset++]) & 255] ^ crc >>> 8;
    }
    while(offset < buffer.length){
        crc = table[(crc ^ buffer[offset++]) & 255] ^ crc >>> 8;
    }
    return (crc ^ 4294967295) >>> 0;
}
class Buffer {
    static concat(...arrays) {
        const array = new Uint8Array(arrays.reduce((length, array1)=>length + array1.length
        , 0));
        let offset = 0;
        for (const x of arrays){
            array.set(x, offset);
            offset += x.length;
        }
        return array;
    }
}
let wasm, u8array_ref, i32array_ref;
async function load() {
    if (wasm) return;
    {
        const { instance  } = await WebAssembly.instantiateStreaming(fetch('https://deno.land/x/imagescript@1.1.14/utils/wasm/zlib.wasm'));
        wasm = instance.exports;
    }
    u8array_ref = new Uint8Array(wasm.memory.buffer);
    i32array_ref = new Int32Array(wasm.memory.buffer);
}
function u8array() {
    return u8array_ref.buffer === wasm.memory.buffer ? u8array_ref : u8array_ref = new Uint8Array(wasm.memory.buffer);
}
function i32array() {
    return i32array_ref.buffer === wasm.memory.buffer ? i32array_ref : i32array_ref = new Int32Array(wasm.memory.buffer);
}
function ptr_to_u8array(ptr, len) {
    return u8array().subarray(ptr, ptr + len);
}
function u8array_to_ptr(buffer) {
    const ptr = wasm.__wbindgen_malloc(buffer.length);
    u8array().set(buffer, ptr);
    return ptr;
}
async function compress(buffer, level) {
    await load();
    const ptr = u8array_to_ptr(buffer);
    wasm.compress(8, ptr, buffer.length, level);
    const i32 = i32array();
    const slice = ptr_to_u8array(i32[2], i32[3]).slice();
    wasm.__wbindgen_free(i32[2], i32[3]);
    return slice;
}
async function decompress(buffer, limit) {
    await load();
    const ptr = u8array_to_ptr(buffer);
    try {
        wasm.decompress(8, ptr, buffer.length, limit);
        const i32 = i32array();
        const slice = ptr_to_u8array(i32[2], i32[3]).slice();
        wasm.__wbindgen_free(i32[2], i32[3]);
        return slice;
    } catch  {
        wasm.__wbindgen_free(ptr, buffer.length);
        throw new Error('zlib: panic');
    }
}
const __IHDR__ = new Uint8Array([
    73,
    72,
    68,
    82
]);
const __IDAT__ = new Uint8Array([
    73,
    68,
    65,
    84
]);
const __IEND__ = new Uint8Array([
    73,
    69,
    78,
    68
]);
const __IEND_CRC__ = crc32(new Uint8Array([
    73,
    69,
    78,
    68
]));
const HEAD = new Uint8Array([
    137,
    80,
    78,
    71,
    13,
    10,
    26,
    10
]);
const color_types = {
    GREYSCALE: 0,
    TRUECOLOR: 2,
    INDEXED_COLOR: 3,
    GREYSCALE_ALPHA: 4,
    TRUECOLOR_ALPHA: 6
};
const channels_to_color_type = {
    1: color_types.GREYSCALE,
    2: color_types.GREYSCALE_ALPHA,
    3: color_types.TRUECOLOR,
    4: color_types.TRUECOLOR_ALPHA
};
async function encode(data, { width , height , channels , depth =8 , level =0  }) {
    let offset = 0;
    let tmp_offset = 0;
    const row_length = width * channels;
    const tmp = new Uint8Array(height + data.length);
    while(offset < data.length){
        tmp[tmp_offset++] = 0;
        tmp.set(data.subarray(offset, offset += row_length), tmp_offset);
        tmp_offset += row_length;
    }
    const compressed = await compress(tmp, level);
    const array = new Uint8Array(49 + HEAD.length + compressed.length);
    array[26] = 0;
    array[27] = 0;
    array[28] = 0;
    array[24] = depth;
    array.set(HEAD, 0);
    array.set(__IHDR__, 12);
    array.set(__IDAT__, 37);
    array.set(compressed, 41);
    array.set(__IEND__, 49 + compressed.length);
    array[25] = channels_to_color_type[channels];
    const view = new DataView(array.buffer);
    view.setUint32(8, 13);
    view.setUint32(16, width);
    view.setUint32(20, height);
    view.setUint32(33, compressed.length);
    view.setUint32(45 + compressed.length, 0);
    view.setUint32(53 + compressed.length, __IEND_CRC__);
    view.setUint32(29, crc32(new Uint8Array(array.buffer, 12, 17)));
    view.setUint32(41 + compressed.length, crc32(new Uint8Array(array.buffer, 37, 4 + compressed.length)));
    return array;
}
function filter_1(slice, pixels, p_offset, bytespp, row_length) {
    let i = 0;
    while(i < bytespp)pixels[i + p_offset] = slice[i++];
    while(i < row_length)pixels[i + p_offset] = slice[i] + pixels[(i++) + p_offset - bytespp];
}
function filter_2(slice, pixels, p_offset, bytespp, row_length) {
    if (0 === p_offset) pixels.set(slice, p_offset);
    else {
        let i = 0;
        while(i < row_length)pixels[i + p_offset] = slice[i] + pixels[(i++) + p_offset - row_length];
    }
}
function filter_3(slice, pixels, p_offset, bytespp, row_length) {
    let i = 0;
    if (0 === p_offset) {
        while(i < bytespp)pixels[i] = slice[i++];
        while(i < row_length)pixels[i] = slice[i] + (pixels[(i++) - bytespp] >> 1);
    } else {
        while(i < bytespp)pixels[i + p_offset] = slice[i] + (pixels[(i++) + p_offset - row_length] >> 1);
        while(i < row_length)pixels[i + p_offset] = slice[i] + (pixels[i + p_offset - bytespp] + pixels[(i++) + p_offset - row_length] >> 1);
    }
}
function filter_4(slice, pixels, p_offset, bytespp, row_length) {
    let i = 0;
    if (0 === p_offset) {
        while(i < bytespp)pixels[i] = slice[i++];
        while(i < row_length)pixels[i] = slice[i] + pixels[(i++) - bytespp];
    } else {
        while(i < bytespp)pixels[i + p_offset] = slice[i] + pixels[(i++) + p_offset - row_length];
        while(i < row_length){
            const a = pixels[i + p_offset - bytespp];
            const b = pixels[i + p_offset - row_length];
            const c = pixels[i + p_offset - bytespp - row_length];
            const p = a + b - c;
            const pa = Math.abs(p - a);
            const pb = Math.abs(p - b);
            const pc = Math.abs(p - c);
            pixels[i + p_offset] = slice[i++] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
        }
    }
}
let u8array_ref1, i32array_ref1, u32array_ref, wasm1;
const utf8encoder = new TextEncoder();
function u8array1() {
    return u8array_ref1.buffer === wasm1.memory.buffer ? u8array_ref1 : u8array_ref1 = new Uint8Array(wasm1.memory.buffer);
}
function i32array1() {
    return i32array_ref1.buffer === wasm1.memory.buffer ? i32array_ref1 : i32array_ref1 = new Int32Array(wasm1.memory.buffer);
}
function u32array() {
    return u32array_ref.buffer === wasm1.memory.buffer ? u32array_ref : u32array_ref = new Uint32Array(wasm1.memory.buffer);
}
function ptr_to_u8array1(ptr, len) {
    return u8array1().subarray(ptr, ptr + len);
}
function ptr_to_u32array(ptr, len) {
    return u32array().subarray(ptr / 4, ptr / 4 + len);
}
function u8array_to_ptr1(buffer) {
    const ptr = wasm1.__wbindgen_malloc(buffer.length);
    u8array1().set(buffer, ptr);
    return ptr;
}
function string_to_ptr(string) {
    let offset = 0;
    let len = string.length;
    let ptr = wasm1.__wbindgen_malloc(string.length);
    const u8 = u8array1();
    while(len > offset){
        const code = string.charCodeAt(offset);
        if (code > 127) break;
        u8[ptr + offset++] = code;
    }
    if (offset !== len) {
        if (offset !== 0) string = string.substring(offset);
        ptr = wasm1.__wbindgen_realloc(ptr, len, len = offset + string.length * 3);
        const ret = utf8encoder.encodeInto(string, u8array1().subarray(ptr + offset, ptr + len));
        offset += ret.written;
    }
    return [
        ptr,
        offset
    ];
}
const nullish = (x)=>x == null
;
function render(ptr, id, scale, r, g, b, text, max_width, wrap_style = false) {
    const str = string_to_ptr(text);
    wasm1.render(ptr, id, scale, r, g, b, str[0], str[1], !nullish(max_width), max_width || 0, wrap_style);
}
function buffer3(id) {
    wasm1.buffer(8, id);
    const i32 = i32array1();
    const slice = ptr_to_u8array1(i32[2], i32[3]).slice();
    wasm1.__wbindgen_free(i32[2], i32[3]);
    return slice;
}
function meta(id) {
    wasm1.meta(8, id);
    const i32 = i32array1();
    const slice = ptr_to_u32array(i32[2], i32[3]).slice();
    wasm1.__wbindgen_free(i32[2], 4 * i32[3]);
    return slice;
}
async function load1(id, buffer1, scale = 128) {
    if (!wasm1) {
        const { instance  } = await WebAssembly.instantiateStreaming(fetch('https://deno.land/x/imagescript@1.1.14/utils/wasm/font.wasm'));
        wasm1 = instance.exports;
        u8array_ref1 = new Uint8Array(wasm1.memory.buffer);
        i32array_ref1 = new Int32Array(wasm1.memory.buffer);
        u32array_ref = new Uint32Array(wasm1.memory.buffer);
    }
    wasm1.load(id, u8array_to_ptr1(buffer1), buffer1.length, scale);
}
function free(id) {
    wasm1.free(id);
}
let wasm2;
let WASM_VECTOR_LEN = 0;
let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm2.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm2.memory.buffer);
    }
    return cachegetUint8Memory0;
}
let cachedTextEncoder = new TextEncoder();
const encodeString = typeof cachedTextEncoder.encodeInto === 'function' ? function(arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
};
function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const textEncoder = new TextEncoder();
        const buf = textEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }
    let len = arg.length;
    let ptr = malloc(len);
    const mem = getUint8Memory0();
    let offset = 0;
    for(; offset < len; offset++){
        const code = arg.charCodeAt(offset);
        if (code > 127) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        offset += ret.written;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
}
let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm2.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm2.memory.buffer);
    }
    return cachegetInt32Memory0;
}
let cachegetUint32Memory0 = null;
function getUint32Memory0() {
    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm2.memory.buffer) {
        cachegetUint32Memory0 = new Uint32Array(wasm2.memory.buffer);
    }
    return cachegetUint32Memory0;
}
function getArrayU32FromWasm0(ptr, len) {
    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr, ptr + len);
}
async function rgba(ptr, svg, fit_kind, zoom, width, height) {
    if (!wasm2) {
        const { instance  } = await WebAssembly.instantiateStreaming(fetch('https://deno.land/x/imagescript@1.1.14/utils/wasm/svg.wasm'));
        wasm2 = instance.exports;
    }
    const ptr0 = passStringToWasm0(svg, wasm2.__wbindgen_malloc, wasm2.__wbindgen_realloc);
    return wasm2.rgba(ptr, ptr0, WASM_VECTOR_LEN, fit_kind, zoom, width, height);
}
function meta1(id) {
    try {
        const retptr = wasm2.__wbindgen_export_2.value - 16;
        wasm2.__wbindgen_export_2.value = retptr;
        wasm2.meta(retptr, id);
        const r0 = getInt32Memory0()[retptr / 4];
        const r1 = getInt32Memory0()[retptr / 4 + 1];
        const v0 = getArrayU32FromWasm0(r0, r1).slice();
        wasm2.__wbindgen_free(r0, r1 * 4);
        return v0;
    } finally{
        wasm2.__wbindgen_export_2.value += 16;
    }
}
function buffer1(id) {
    try {
        const retptr = wasm2.__wbindgen_export_2.value - 16;
        wasm2.__wbindgen_export_2.value = retptr;
        wasm2.buffer(retptr, id);
        const r0 = getInt32Memory0()[retptr / 4];
        const r1 = getInt32Memory0()[retptr / 4 + 1];
        const v0 = getArrayU8FromWasm0(r0, r1).slice();
        wasm2.__wbindgen_free(r0, r1);
        return v0;
    } finally{
        wasm2.__wbindgen_export_2.value += 16;
    }
}
function free1(id) {
    wasm2.free(id);
}
let wasm3;
let cachegetUint8Memory01 = null;
function getUint8Memory01() {
    if (cachegetUint8Memory01 === null || cachegetUint8Memory01.buffer !== wasm3.memory.buffer) {
        cachegetUint8Memory01 = new Uint8Array(wasm3.memory.buffer);
    }
    return cachegetUint8Memory01;
}
let WASM_VECTOR_LEN1 = 0;
function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory01().set(arg, ptr / 1);
    WASM_VECTOR_LEN1 = arg.length;
    return ptr;
}
let cachegetInt32Memory01 = null;
function getInt32Memory01() {
    if (cachegetInt32Memory01 === null || cachegetInt32Memory01.buffer !== wasm3.memory.buffer) {
        cachegetInt32Memory01 = new Int32Array(wasm3.memory.buffer);
    }
    return cachegetInt32Memory01;
}
function getArrayU8FromWasm01(ptr, len) {
    return getUint8Memory01().subarray(ptr / 1, ptr / 1 + len);
}
let cachegetUint16Memory0 = null;
function getUint16Memory0() {
    if (cachegetUint16Memory0 === null || cachegetUint16Memory0.buffer !== wasm3.memory.buffer) {
        cachegetUint16Memory0 = new Uint16Array(wasm3.memory.buffer);
    }
    return cachegetUint16Memory0;
}
function getArrayU16FromWasm0(ptr, len) {
    return getUint16Memory0().subarray(ptr / 2, ptr / 2 + len);
}
async function initWASM() {
    if (wasm3) return;
    const { instance  } = await WebAssembly.instantiateStreaming(fetch('https://deno.land/x/imagescript@1.1.14/utils/wasm/jpeg.wasm'));
    wasm3 = instance.exports;
}
async function encode1(width, height, quality, buffer2) {
    await initWASM();
    try {
        const retptr = wasm3.__wbindgen_export_0.value - 16;
        wasm3.__wbindgen_export_0.value = retptr;
        const ptr0 = passArray8ToWasm0(buffer2, wasm3.__wbindgen_malloc);
        wasm3.encode(retptr, width, height, quality, ptr0, WASM_VECTOR_LEN1);
        const r0 = getInt32Memory01()[retptr / 4];
        const r1 = getInt32Memory01()[retptr / 4 + 1];
        const v1 = getArrayU8FromWasm01(r0, r1).slice();
        wasm3.__wbindgen_free(r0, r1 * 1);
        return v1;
    } finally{
        wasm3.__wbindgen_export_0.value += 16;
    }
}
async function decode(ptr, buffer2, width, height) {
    await initWASM();
    const ptr0 = passArray8ToWasm0(buffer2, wasm3.__wbindgen_malloc);
    return wasm3.decode(ptr, ptr0, WASM_VECTOR_LEN1, width, height);
}
function meta2(id) {
    try {
        const retptr = wasm3.__wbindgen_export_0.value - 16;
        wasm3.__wbindgen_export_0.value = retptr;
        wasm3.meta(retptr, id);
        const r0 = getInt32Memory01()[retptr / 4];
        const r1 = getInt32Memory01()[retptr / 4 + 1];
        const v0 = getArrayU16FromWasm0(r0, r1).slice();
        wasm3.__wbindgen_free(r0, r1 * 2);
        return v0;
    } finally{
        wasm3.__wbindgen_export_0.value += 16;
    }
}
function buffer2(id) {
    try {
        const retptr = wasm3.__wbindgen_export_0.value - 16;
        wasm3.__wbindgen_export_0.value = retptr;
        wasm3.buffer(retptr, id);
        const r0 = getInt32Memory01()[retptr / 4];
        const r1 = getInt32Memory01()[retptr / 4 + 1];
        const v0 = getArrayU8FromWasm01(r0, r1).slice();
        wasm3.__wbindgen_free(r0, r1 * 1);
        return v0;
    } finally{
        wasm3.__wbindgen_export_0.value += 16;
    }
}
function free2(id) {
    wasm3.free(id);
}
let wasm4;
let cachedTextDecoder = new TextDecoder('utf-8', {
    ignoreBOM: true,
    fatal: true
});
cachedTextDecoder.decode();
let cachegetUint8Memory02 = null;
function getUint8Memory02() {
    if (cachegetUint8Memory02 === null || cachegetUint8Memory02.buffer !== wasm4.memory.buffer) {
        cachegetUint8Memory02 = new Uint8Array(wasm4.memory.buffer);
    }
    return cachegetUint8Memory02;
}
let cachegetInt32Memory02 = null;
function getInt32Memory02() {
    if (cachegetInt32Memory02 === null || cachegetInt32Memory02.buffer !== wasm4.memory.buffer) {
        cachegetInt32Memory02 = new Int32Array(wasm4.memory.buffer);
    }
    return cachegetInt32Memory02;
}
function getArrayU8FromWasm02(ptr, len) {
    return getUint8Memory02().subarray(ptr / 1, ptr / 1 + len);
}
let WASM_VECTOR_LEN2 = 0;
function passArray8ToWasm01(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory02().set(arg, ptr / 1);
    WASM_VECTOR_LEN2 = arg.length;
    return ptr;
}
class GIFEncoder {
    free() {
        wasm4.__wbg_gif_encoder_free(this.ptr);
    }
    static async initialize(width, height, repeat) {
        if (!wasm4) {
            const { instance  } = await WebAssembly.instantiateStreaming(fetch('https://deno.land/x/imagescript@1.1.14/utils/wasm/gif.wasm'), {
                __wbindgen_placeholder__: {
                    __wbindgen_throw: function(arg0, arg1) {
                        throw new Error(getStringFromWasm0(arg0, arg1));
                    }
                }
            });
            wasm4 = instance.exports;
        }
        const ret = wasm4.gif_encoder_new(width, height, repeat);
        return new GIFEncoder(ret);
    }
    constructor(ptr){
        this.ptr = ptr;
    }
    buffer() {
        try {
            const retptr = wasm4.__wbindgen_export_0.value - 16;
            wasm4.__wbindgen_export_0.value = retptr;
            wasm4.gif_encoder_buffer(retptr, this.ptr);
            const r0 = getInt32Memory02()[retptr / 4];
            const r1 = getInt32Memory02()[retptr / 4 + 1];
            const v0 = getArrayU8FromWasm02(r0, r1).slice();
            wasm4.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally{
            wasm4.__wbindgen_export_0.value += 16;
        }
    }
    add(delay, quality, buffer) {
        const ptr0 = passArray8ToWasm01(buffer, wasm4.__wbindgen_malloc);
        wasm4.gif_encoder_add(this.ptr, delay, quality, ptr0, WASM_VECTOR_LEN2);
    }
}
async function decode1(array) {
    let view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    const width = view.getUint32(16);
    const height = view.getUint32(20);
    const bpc = array[24];
    const pixel_type = array[25];
    let channels = {
        3: 1,
        0: 1,
        4: 2,
        2: 3,
        6: 4
    }[pixel_type];
    const bytespp = channels * bpc / 8;
    const row_length = width * bytespp;
    let pixels = new Uint8Array(height * row_length);
    let offset = 0;
    let p_offset = 0;
    let c_offset = 33;
    const chunks = [];
    let palette;
    if (array[25] === 3) palette = new Uint32Array(2 ** bpc);
    let type;
    while(type !== 1229278788){
        type = view.getUint32(4 + c_offset);
        if (type === 1229209940) chunks.push(array.subarray(8 + c_offset, 8 + c_offset + view.getUint32(c_offset)));
        else if (type === 1347179589) {
            for(let pxlOffset = 0; pxlOffset < palette.length * 8; pxlOffset += 3)palette[pxlOffset / 3] = array[8 + c_offset + pxlOffset] << 24 | array[8 + c_offset + pxlOffset + 1] << 16 | array[8 + c_offset + pxlOffset + 2] << 8 | 255;
        }
        c_offset += 4 + 4 + 4 + view.getUint32(c_offset);
    }
    array = await decompress(chunks.length === 1 ? chunks[0] : Buffer.concat(...chunks));
    while(offset < array.byteLength){
        const filter = array[offset++];
        const slice = array.subarray(offset, offset += row_length);
        if (0 === filter) pixels.set(slice, p_offset);
        else if (1 === filter) filter_1(slice, pixels, p_offset, bytespp, row_length);
        else if (2 === filter) filter_2(slice, pixels, p_offset, bytespp, row_length);
        else if (3 === filter) filter_3(slice, pixels, p_offset, bytespp, row_length);
        else if (4 === filter) filter_4(slice, pixels, p_offset, bytespp, row_length);
        p_offset += row_length;
    }
    if (channels === 1 && palette) {
        channels = 4;
        const newPixels = new Uint8Array(width * height * 4);
        const pixelView = new DataView(newPixels.buffer, newPixels.byteOffset, newPixels.byteLength);
        for(let i = 0; i < pixels.length; i++)pixelView.setUint32(i * 4, palette[pixels[i]], false);
        pixels = newPixels;
    }
    if (bpc !== 8) {
        const newPixels = new Uint8Array(pixels.length / bpc * 8);
        for(let i = 0; i < pixels.length; i += 2)newPixels[i / 2] = pixels[i];
        pixels = newPixels;
    }
    if (channels !== 4) {
        const newPixels = new Uint8Array(width * height * 4);
        const view1 = new DataView(newPixels.buffer);
        if (channels === 1) {
            for(let i = 0; i < width * height; i++){
                const pixel = pixels[i];
                view1.setUint32(i * 4, pixel << 24 | pixel << 16 | pixel << 8 | 255, false);
            }
        } else if (channels === 2) {
            for(let i = 0; i < width * height * 2; i += 2){
                const pixel = pixels[i];
                view1.setUint32(i * 2, pixel << 24 | pixel << 16 | pixel << 8 | pixels[i + 1], false);
            }
        } else if (channels === 3) {
            newPixels.fill(255);
            for(let i = 0; i < width * height; i++)newPixels.set(pixels.subarray(i * 3, i * 3 + 3), i * 4);
        }
        pixels = newPixels;
    }
    return {
        width,
        height,
        pixels
    };
}
class Image1 {
    constructor(width1, height1){
        width1 = ~~width1;
        height1 = ~~height1;
        if (width1 < 1) throw new RangeError('Image has to be at least 1 pixel wide');
        if (height1 < 1) throw new RangeError('Image has to be at least 1 pixel high');
        this.__width__ = width1;
        this.__height__ = height1;
        this.__buffer__ = new ArrayBuffer(width1 * height1 * 4);
        this.__view__ = new DataView(this.__buffer__);
        this.__u32__ = new Uint32Array(this.__buffer__);
        this.bitmap = new Uint8ClampedArray(this.__buffer__);
    }
    toString() {
        return `Image<${this.width}x${this.height}>`;
    }
    static new(width, height) {
        return new this(width, height);
    }
    get width() {
        return this.__width__;
    }
    get height() {
        return this.__height__;
    }
    *[Symbol.iterator]() {
        for(let y = 1; y <= this.height; y++){
            for(let x = 1; x <= this.width; x++){
                yield [
                    x,
                    y
                ];
            }
        }
    }
    *iterateWithColors() {
        let offset = 0;
        for(let y = 1; y <= this.height; y++){
            for(let x = 1; x <= this.width; x++){
                yield [
                    x,
                    y,
                    this.__view__.getUint32(offset, false)
                ];
                offset += 4;
            }
        }
    }
    static rgbaToColor(r, g, b, a) {
        return ((r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | a & 255) >>> 0;
    }
    static rgbToColor(r, g, b) {
        return Image1.rgbaToColor(r, g, b, 255);
    }
    static hslaToColor(h, s, l, a) {
        h %= 1;
        s = Math.min(1, Math.max(0, s));
        l = Math.min(1, Math.max(0, l));
        a = Math.min(1, Math.max(0, a));
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t)=>{
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return Image1.rgbaToColor(r * 255, g * 255, b * 255, a * 255);
    }
    static hslToColor(h, s, l) {
        return Image1.hslaToColor(h, s, l, 1);
    }
    static rgbaToHSLA(r, g, b, a) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return [
            h,
            s,
            l,
            a / 255
        ];
    }
    static colorToRGBA(color) {
        return [
            color >> 24 & 255,
            color >> 16 & 255,
            color >> 8 & 255,
            color & 255
        ];
    }
    static colorToRGB(color) {
        return Image1.colorToRGBA(color).slice(0, 3);
    }
    getPixelAt(x, y) {
        this.__check_boundaries__(x, y);
        return this.__view__.getUint32(((~~y - 1) * this.width + (~~x - 1)) * 4, false);
    }
    getRGBAAt(x, y) {
        this.__check_boundaries__(x, y);
        const idx = ((~~y - 1) * this.width + (~~x - 1)) * 4;
        return this.bitmap.subarray(idx, idx + 4);
    }
    setPixelAt(x, y, pixelColor) {
        x = ~~x;
        y = ~~y;
        this.__check_boundaries__(x, y);
        this.__set_pixel__(x, y, pixelColor);
        return this;
    }
    __set_pixel__(x, y, pixelColor) {
        this.__view__.setUint32(((y - 1) * this.width + (x - 1)) * 4, pixelColor, false);
    }
    __check_boundaries__(x, y) {
        if (isNaN(x)) throw new TypeError(`Invalid pixel coordinates (x=${x})`);
        if (isNaN(y)) throw new TypeError(`Invalid pixel coordinates (y=${y})`);
        if (x < 1) throw new RangeError(`${Image1.__out_of_bounds__} (x=${x})<1`);
        if (x > this.width) throw new RangeError(`${Image1.__out_of_bounds__} (x=${x})>(width=${this.width})`);
        if (y < 1) throw new RangeError(`${Image1.__out_of_bounds__} (y=${y})<1`);
        if (y > this.height) throw new RangeError(`${Image1.__out_of_bounds__} (y=${y})>(height=${this.height})`);
    }
    static get __out_of_bounds__() {
        return 'Tried referencing a pixel outside of the images boundaries:';
    }
    fill(color) {
        const type = typeof color;
        if (type !== 'function') {
            this.__view__.setUint32(0, color, false);
            this.__u32__.fill(this.__u32__[0]);
        } else {
            let offset = 0;
            for(let y = 1; y <= this.height; y++){
                for(let x = 1; x <= this.width; x++){
                    this.__view__.setUint32(offset, color(x, y), false);
                    offset += 4;
                }
            }
        }
        return this;
    }
    clone() {
        const image = Image1.new(this.width, this.height);
        image.bitmap.set(this.bitmap);
        return image;
    }
    static get RESIZE_NEAREST_NEIGHBOR() {
        return 'RESIZE_NEAREST_NEIGHBOR';
    }
    static get RESIZE_AUTO() {
        return -1;
    }
    scale(factor, mode = Image1.RESIZE_NEAREST_NEIGHBOR) {
        if (factor === 1) return this;
        return this.resize(this.width * factor, this.height * factor, mode);
    }
    resize(width, height, mode = Image1.RESIZE_NEAREST_NEIGHBOR) {
        if (width === Image1.RESIZE_AUTO && height === Image1.RESIZE_AUTO) throw new Error('RESIZE_AUTO can only be used for either width or height, not for both');
        else if (width === Image1.RESIZE_AUTO) width = this.width / this.height * height;
        else if (height === Image1.RESIZE_AUTO) height = this.height / this.width * width;
        width = Math.floor(width);
        height = Math.floor(height);
        if (width < 1) throw new RangeError('Image has to be at least 1 pixel wide');
        if (height < 1) throw new RangeError('Image has to be at least 1 pixel high');
        if (mode === Image1.RESIZE_NEAREST_NEIGHBOR) return this.__resize_nearest_neighbor__(width, height);
        else throw new Error('Invalid resize mode');
    }
    __resize_nearest_neighbor__(width, height) {
        const image = new this.constructor(width, height);
        for(let y = 0; y < height; y++){
            for(let x = 0; x < width; x++){
                const ySrc = Math.floor(y * this.height / height);
                const xSrc = Math.floor(x * this.width / width);
                const destPos = (y * width + x) * 4;
                const srcPos = (ySrc * this.width + xSrc) * 4;
                image.__view__.setUint32(destPos, this.__view__.getUint32(srcPos, false), false);
            }
        }
        this.__apply__(image);
        return this;
    }
    crop(x, y, width, height) {
        if (width > this.width) width = this.width;
        if (height > this.height) height = this.height;
        return this.__apply__(this.__crop__(x, y, width, height));
    }
    __crop__(x, y, width, height) {
        x = ~~x;
        y = ~~y;
        const image = new this.constructor(width, height);
        for(let tY = 0; tY < height; tY++){
            const idx = (tY + y) * this.width + x;
            image.__u32__.set(this.__u32__.subarray(idx, idx + width), tY * width);
        }
        return image;
    }
    drawBox(x, y, width, height, color) {
        x -= 1;
        y -= 1;
        if (typeof color === 'function') {
            for(let tY = 1; tY <= height; tY++){
                for(let tX = 1; tX <= width; tX++){
                    const nX = tX + x;
                    const nY = tY + y;
                    if (Math.min(nX, nY) < 1 || nX > this.width || nY > this.height) continue;
                    const tC = color(tX, tY);
                    this.__set_pixel__(nX, nY, tC);
                }
            }
        } else return this.__fast_box__(x, y, width, height, color);
        return this;
    }
    __fast_box__(x, y, width, height, color) {
        if (x < 0) {
            width += x;
            x = 1;
        }
        if (y < 0) {
            height += y;
            y = 1;
        }
        const right = Math.max(Math.min(x + width, this.width), 1);
        let xPos = right;
        while(x <= --xPos)this.__view__.setUint32(4 * (xPos + y * this.width), color);
        const end = 4 * (right + y * this.width);
        const start = 4 * (x + y * this.width);
        let bottom = Math.max(Math.min(y + height, this.height), 1);
        while(y < --bottom)this.bitmap.copyWithin(4 * (x + bottom * this.width), start, end);
        return this;
    }
    drawCircle(x, y, radius, color) {
        const radSquared = radius ** 2;
        for(let currentY = Math.max(1, y - radius); currentY <= Math.min(y + radius, this.height); currentY++){
            for(let currentX = Math.max(1, x - radius); currentX <= Math.min(x + radius, this.width); currentX++){
                if ((currentX - x) ** 2 + (currentY - y) ** 2 < radSquared) this.__set_pixel__(currentX, currentY, typeof color === 'function' ? color(currentX - x + radius, currentY - y + radius) : color);
            }
        }
        return this;
    }
    cropCircle(max = false, feathering = 0) {
        const rad = Math[max ? 'max' : 'min'](this.width, this.height) / 2;
        const radSquared = rad ** 2;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        for (const [x, y] of this){
            const distanceFromCenter = (x - centerX) ** 2 + (y - centerY) ** 2;
            const alphaIdx = ((y - 1) * this.width + (x - 1)) * 4 + 3;
            if (distanceFromCenter > radSquared) this.bitmap[alphaIdx] = 0;
            else if (feathering) this.bitmap[alphaIdx] *= Math.max(0, Math.min(1, 1 - distanceFromCenter / radSquared * feathering ** (1 / 2)));
        }
        return this;
    }
    opacity(opacity, absolute = false) {
        if (isNaN(opacity) || opacity < 0) throw new RangeError('Invalid opacity value');
        this.__set_channel_value__(opacity, absolute, 3);
        return this;
    }
    red(saturation, absolute = false) {
        if (isNaN(saturation) || saturation < 0) throw new RangeError('Invalid saturation value');
        this.__set_channel_value__(saturation, absolute, 0);
        return this;
    }
    green(saturation, absolute = false) {
        if (isNaN(saturation) || saturation < 0) throw new RangeError('Invalid saturation value');
        this.__set_channel_value__(saturation, absolute, 1);
        return this;
    }
    blue(saturation, absolute = false) {
        if (isNaN(saturation) || saturation < 0) throw new RangeError('Invalid saturation value');
        this.__set_channel_value__(saturation, absolute, 2);
        return this;
    }
    __set_channel_value__(value, absolute, offset) {
        for(let i = offset; i < this.bitmap.length; i += 4)this.bitmap[i] = value * (absolute ? 255 : this.bitmap[i]);
    }
    lightness(value, absolute = false) {
        if (isNaN(value) || value < 0) throw new RangeError('Invalid lightness value');
        return this.fill((x, y)=>{
            const [h, s, l, a] = Image1.rgbaToHSLA(...this.getRGBAAt(x, y));
            return Image1.hslaToColor(h, s, value * (absolute ? 1 : l), a);
        });
    }
    saturation(value, absolute = false) {
        if (isNaN(value) || value < 0) throw new RangeError('Invalid saturation value');
        return this.fill((x, y)=>{
            const [h, s, l, a] = Image1.rgbaToHSLA(...this.getRGBAAt(x, y));
            return Image1.hslaToColor(h, value * (absolute ? 1 : s), l, a);
        });
    }
    composite(source, x = 0, y = 0) {
        x = ~~x;
        y = ~~y;
        for(let yy = 0; yy < source.height; yy++){
            let y_offset = y + yy;
            if (y_offset < 0) continue;
            if (y_offset >= this.height) break;
            for(let xx = 0; xx < source.width; xx++){
                let x_offset = x + xx;
                if (x_offset < 0) continue;
                if (x_offset >= this.width) break;
                const offset = 4 * (x_offset + y_offset * this.width);
                const fg = source.__view__.getUint32(4 * (xx + yy * source.width), false);
                const bg = this.__view__.getUint32(offset, false);
                if ((fg & 255) === 255) this.__view__.setUint32(offset, fg, false);
                else if ((fg & 255) === 0) this.__view__.setUint32(offset, bg, false);
                else this.__view__.setUint32(offset, Image1.__alpha_blend__(fg, bg), false);
            }
        }
        return this;
    }
    static __alpha_blend__(fg, bg) {
        const fa = fg & 255;
        const alpha = fa + 1;
        const inv_alpha = 256 - fa;
        const r = alpha * (fg >>> 24) + inv_alpha * (bg >>> 24) >> 8;
        const b = alpha * (fg >> 8 & 255) + inv_alpha * (bg >> 8 & 255) >> 8;
        const g = alpha * (fg >> 16 & 255) + inv_alpha * (bg >> 16 & 255) >> 8;
        return (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | Math.max(fa, bg & 255) & 255;
    }
    invert() {
        for (const [x, y, color] of this.iterateWithColors())this.__set_pixel__(x, y, 4294967295 - color & 4294967040 | color & 255);
        return this;
    }
    invertValue() {
        for (const [x, y, color] of this.iterateWithColors()){
            const [h, s, l, a] = Image1.rgbaToHSLA(...Image1.colorToRGBA(color));
            this.__set_pixel__(x, y, Image1.hslaToColor(h, s, 1 - l, a));
        }
        return this;
    }
    invertSaturation() {
        for (const [x, y, color] of this.iterateWithColors()){
            const [h, s, l, a] = Image1.rgbaToHSLA(...Image1.colorToRGBA(color));
            this.__set_pixel__(x, y, Image1.hslaToColor(h, 1 - s, l, a));
        }
        return this;
    }
    invertHue() {
        for (const [x, y, color] of this.iterateWithColors()){
            const [h, s, l, a] = Image1.rgbaToHSLA(...Image1.colorToRGBA(color));
            this.__set_pixel__(x, y, Image1.hslaToColor(1 - h, s, l, a));
        }
        return this;
    }
    hueShift(degrees) {
        for (const [x, y, color] of this.iterateWithColors()){
            const [h, s, l, a] = Image1.rgbaToHSLA(...Image1.colorToRGBA(color));
            this.__set_pixel__(x, y, Image1.hslaToColor(h + degrees / 360, s, l, a));
        }
        return this;
    }
    averageColor() {
        let colorAvg = [
            0,
            0,
            0
        ];
        let divisor = 0;
        for(let idx = 0; idx < this.bitmap.length; idx += 4){
            const rgba1 = this.bitmap.subarray(idx, idx + 4);
            for(let i = 0; i < 3; i++)colorAvg[i] += rgba1[i];
            divisor += rgba1[3] / 255;
        }
        return Image1.rgbaToColor(...colorAvg.map((v)=>v / divisor
        ), 255);
    }
    dominantColor(ignoreBlack = true, ignoreWhite = true, bwThreshold = 15) {
        const colorCounts = new Array(262143);
        for(let i = 0; i < this.bitmap.length; i += 4){
            const color = this.__view__.getUint32(i, false);
            const [h, s, l] = Image1.rgbaToHSLA(...Image1.colorToRGBA(color)).map((v)=>~~(v * 63)
            );
            if (ignoreBlack && l < bwThreshold) continue;
            if (ignoreWhite && l > 63 - bwThreshold) continue;
            const key = h << 12 | s << 6 | l;
            colorCounts[key] = (colorCounts[key] || 0) + 1;
        }
        let maxColorCount = -1;
        let mostProminentValue = 0;
        colorCounts.forEach((el, i1)=>{
            if (el < maxColorCount) return;
            maxColorCount = el;
            mostProminentValue = i1;
        });
        if (mostProminentValue === -1) return this.dominantColor(ignoreBlack, ignoreWhite, bwThreshold - 1);
        const h = mostProminentValue >>> 12 & 63;
        const s = mostProminentValue >>> 6 & 63;
        const l = mostProminentValue & 63;
        return Image1.hslaToColor(h / 63, s / 63, l / 63, 1);
    }
    rotate(angle, resize = true) {
        if (angle % 360 === 0) return this;
        if (angle % 180 === 0) return this.__rotate_180__();
        const rad = Math.PI * (angle / 180);
        const sin = Math.sin(rad);
        const cos = Math.cos(rad);
        const width2 = resize ? Math.abs(this.width * sin) + Math.abs(this.height * cos) : this.width;
        const height2 = resize ? Math.abs(this.width * cos) + Math.abs(this.height * sin) : this.height;
        const out = Image1.new(width2, height2);
        const out_cx = width2 / 2 - 0.5;
        const out_cy = height2 / 2 - 0.5;
        const src_cx = this.width / 2 - 0.5;
        const src_cy = this.height / 2 - 0.5;
        let h = 0;
        do {
            let w = 0;
            const ysin = src_cx - sin * (h - out_cy);
            const ycos = src_cy + cos * (h - out_cy);
            do {
                const xf = ysin + cos * (w - out_cx);
                const yf = ycos + sin * (w - out_cx);
                Image1.__interpolate__(this, out, w, h, xf, yf);
            }while ((w++) < width2)
        }while ((h++) < height2)
        return this.__apply__(out);
    }
    __rotate_180__() {
        let offset = 0;
        this.bitmap.reverse();
        while(offset < this.bitmap.length)this.bitmap.subarray(offset, offset += 4).reverse();
        return this;
    }
    static __interpolate__(src, out, x0, y0, x1, y1) {
        const x2 = ~~x1;
        const y2 = ~~y1;
        const xq = x1 - x2;
        const yq = y1 - y2;
        const out_slice = out.bitmap.subarray(4 * (x0 + y0 * out.width), -4);
        const ref = {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        };
        Image1.__pawn__(x2, y2, (1 - xq) * (1 - yq), ref, src);
        Image1.__pawn__(1 + x2, y2, xq * (1 - yq), ref, src);
        Image1.__pawn__(x2, 1 + y2, (1 - xq) * yq, ref, src);
        Image1.__pawn__(1 + x2, 1 + y2, xq * yq, ref, src);
        out_slice[3] = ref.a;
        out_slice[0] = ref.r / ref.a;
        out_slice[1] = ref.g / ref.a;
        out_slice[2] = ref.b / ref.a;
    }
    static __pawn__(point0, point1, weight, ref, src) {
        if (point0 > 0 && point1 > 0 && point0 < src.width && point1 < src.height) {
            const offset = 4 * (point0 + point1 * src.width);
            const src_slice = src.bitmap.subarray(offset, offset + 4);
            const wa = weight * src_slice[3];
            ref.a += wa;
            ref.r += wa * src_slice[0];
            ref.g += wa * src_slice[1];
            ref.b += wa * src_slice[2];
        }
    }
    __apply__(image) {
        this.__width__ = image.__width__;
        this.__height__ = image.__height__;
        this.__view__ = image.__view__;
        this.__u32__ = image.__u32__;
        this.bitmap = image.bitmap;
        return this;
    }
    static gradient(colors) {
        const entries = Object.entries(colors).sort((a, b)=>a[0] - b[0]
        );
        const positions = entries.map((e)=>parseFloat(e[0])
        );
        const values = entries.map((e)=>e[1]
        );
        if (positions.length === 0) throw new RangeError('Invalid gradient point count');
        else if (positions.length === 1) {
            return ()=>values[0]
            ;
        } else if (positions.length === 2) {
            const gradient = this.__gradient__(values[0], values[1]);
            return (position)=>{
                if (position <= positions[0]) return values[0];
                if (position >= positions[1]) return values[1];
                return gradient((position - positions[0]) / (positions[1] - positions[0]));
            };
        }
        const minDef = Math.min(...positions);
        const maxDef = Math.max(...positions);
        let gradients = [];
        for(let i = 0; i < positions.length; i++){
            let minPos = positions[i - 1];
            if (minPos === undefined) continue;
            let maxPos = positions[i];
            let minVal = values[i - 1];
            if (minVal === undefined) minVal = values[i];
            const maxVal = values[i];
            const gradient = this.__gradient__(minVal, maxVal);
            gradients.push({
                min: minPos,
                max: maxPos,
                gradient
            });
        }
        return (position)=>{
            if (position <= minDef) return gradients[0].gradient(0);
            if (position >= maxDef) return gradients[gradients.length - 1].gradient(1);
            for (const gradient of gradients)if (position >= gradient.min && position <= gradient.max) return gradient.gradient((position - gradient.min) / (gradient.max - gradient.min));
            throw new RangeError(`Invalid gradient position: ${position}`);
        };
    }
    roundCorners(radius = Math.min(this.width, this.height) / 4) {
        const radSquared = radius ** 2;
        for(let x = 1; x <= radius; x++){
            const xRad = (x - radius) ** 2;
            for(let y = 1; y <= radius; y++){
                if (xRad + (y - radius) ** 2 > radSquared) this.bitmap[((y - 1) * this.width + x - 1) * 4 + 3] = 0;
            }
        }
        for(let x1 = 1; x1 <= radius; x1++){
            const xRad = (x1 - radius) ** 2;
            for(let y = this.height - radius; y <= this.height; y++){
                if (xRad + (this.height - y - radius) ** 2 > radSquared) this.bitmap[((y - 1) * this.width + x1 - 1) * 4 + 3] = 0;
            }
        }
        for(let x2 = this.width - radius; x2 <= this.width; x2++){
            const xRad = (this.width - x2 - radius) ** 2;
            for(let y = 1; y <= radius; y++){
                if (xRad + (y - radius) ** 2 > radSquared) this.bitmap[((y - 1) * this.width + x2 - 1) * 4 + 3] = 0;
            }
        }
        for(let x3 = this.width - radius; x3 <= this.width; x3++){
            const xRad = (this.width - x3 - radius) ** 2;
            for(let y = this.height - radius; y <= this.height; y++){
                if (xRad + (this.height - y - radius) ** 2 > radSquared) this.bitmap[((y - 1) * this.width + x3 - 1) * 4 + 3] = 0;
            }
        }
        return this;
    }
    static __gradient__(startColor, endColor) {
        const sr = startColor >>> 24;
        const sg = startColor >> 16 & 255;
        const sb = startColor >> 8 & 255;
        const sa = startColor & 255;
        const er = (endColor >>> 24) - sr;
        const eg = (endColor >> 16 & 255) - sg;
        const eb = (endColor >> 8 & 255) - sb;
        const ea = (endColor & 255) - sa;
        return (position)=>{
            const r = sr + position * er;
            const g = sg + position * eg;
            const b = sb + position * eb;
            const a = sa + position * ea;
            return (r & 255) << 24 | (g & 255) << 16 | (b & 255) << 8 | a & 255;
        };
    }
    async encode(compression = 1) {
        return await encode(this.bitmap, {
            width: this.width,
            height: this.height,
            level: compression,
            channels: 4
        });
    }
    async encodeJPEG(quality = 90) {
        quality = Math.max(1, Math.min(100, quality));
        const jpegCanvas = new this.constructor(this.width, this.height);
        jpegCanvas.fill(255);
        jpegCanvas.composite(this);
        return encode1(this.width, this.height, quality, jpegCanvas.bitmap);
    }
    static async decode(data) {
        let image;
        let view;
        if (!ArrayBuffer.isView(data)) {
            data = new Uint8Array(data);
            view = new DataView(data.buffer);
        } else {
            data = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
            view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        }
        if (view.getUint32(0, false) === 2303741511) {
            const { width: width2 , height: height2 , pixels  } = await decode1(data);
            image = new this(width2, height2);
            image.bitmap.set(pixels);
        } else if (view.getUint32(0, false) >>> 8 === 16767231) {
            const status = await decode(0, data, 0, 0);
            if (status === 1) throw new Error('Failed decoding JPEG image');
            const [pixelType, width2, height2] = meta2(0);
            image = new this(width2, height2);
            const buffer4 = buffer2(0);
            free2(0);
            if (pixelType === 0) {
                const view1 = new DataView(image.bitmap.buffer);
                for(let i = 0; i < buffer4.length; i++){
                    const pixel = buffer4[i];
                    view1.setUint32(i * 4, pixel << 24 | pixel << 16 | pixel << 8 | 255, false);
                }
            } else if (pixelType === 1) {
                image.bitmap.fill(255);
                for(let i = 0; i < width2 * height2; i++)image.bitmap.set(buffer4.subarray(i * 3, i * 3 + 3), i * 4);
            } else if (pixelType === 2) {
                for(let i = 0; i < buffer4.length; i += 4){
                    image.bitmap[i] = 255 * (1 - buffer4[i] / 255) * (1 - buffer4[i + 3] / 255);
                    image.bitmap[i + 1] = 255 * (1 - buffer4[i + 1] / 255) * (1 - buffer4[i + 3] / 255);
                    image.bitmap[i + 2] = 255 * (1 - buffer4[i + 2] / 255) * (1 - buffer4[i + 3] / 255);
                    image.bitmap[i + 3] = 255;
                }
            }
        } else if (view.getUint32(0, false) === 1229531648) {
            const status = await tifflib.decode(0, data);
            if (status === 1) throw new Error('Failed decoding TIFF image');
            const meta3 = tifflib.meta(0);
            const buffer4 = tifflib.buffer(0);
            tifflib.free(0);
            image = new this(...meta3);
            image.bitmap.set(buffer4);
        } else throw new Error('Unsupported image type');
        return image;
    }
    static get SVG_MODE_SCALE() {
        return 1;
    }
    static get SVG_MODE_WIDTH() {
        return 2;
    }
    static get SVG_MODE_HEIGHT() {
        return 3;
    }
    static async renderSVG(svg, size = 1, mode = this.SVG_MODE_SCALE) {
        if (![
            this.SVG_MODE_WIDTH,
            this.SVG_MODE_HEIGHT,
            this.SVG_MODE_SCALE
        ].includes(mode)) throw new Error('Invalid SVG scaling mode');
        if (mode === this.SVG_MODE_SCALE && size <= 0) throw new RangeError('SVG scale must be > 0');
        if (mode !== this.SVG_MODE_SCALE && size < 1) throw new RangeError('SVG size must be >= 1');
        if (typeof svg !== 'string') svg = Deno.core.decode(svg);
        const status = await rgba(0, svg, mode, size, size, size);
        if (status === 1) throw new Error('Failed parsing SVG');
        if (status === 2) throw new Error('Failed rendering SVG');
        const meta3 = meta1(0);
        const image = new this(...meta3);
        image.bitmap.set(buffer1(0));
        free1(0);
        return image;
    }
    static get WRAP_STYLE_CHAR() {
        return true;
    }
    static get WRAP_STYLE_WORD() {
        return false;
    }
    static async renderText(font, scale, text, color = 4294967295, wrapWidth = Infinity, wrapStyle = this.WRAP_STYLE_WORD) {
        const [r, g, b, a] = Image1.colorToRGBA(color);
        await load1(0, font, scale);
        render(0, 0, scale, r, g, b, text, wrapWidth === Infinity ? null : wrapWidth, wrapStyle);
        const buffer4 = buffer3(0);
        const [width2, height2] = meta(0);
        free(0);
        const image = new this(width2, height2);
        image.bitmap.set(buffer4);
        image.opacity(a / 255);
        return image;
    }
}
export { Image1 as Image };
export class Frame extends Image1 {
    constructor(width2, height2, duration1 = 100){
        if (isNaN(duration1) || duration1 < 0) throw new RangeError('Invalid frame duration');
        super(width2, height2);
        this.duration = duration1;
    }
    toString() {
        return `Frame<${this.width}x${this.height}x${this.duration}ms>`;
    }
    static from(image, duration) {
        if (!(image instanceof Image1)) throw new TypeError('Invalid image passed');
        const frame = new Frame(image.width, image.height, duration);
        frame.bitmap.set(image.bitmap);
        return frame;
    }
}
export class GIF extends Array {
    constructor(frames, loopCount = -1){
        super(...frames);
        this.width = frames[0].width;
        this.height = frames[0].height;
        for (const frame of this){
            if (!(frame instanceof Frame)) throw new TypeError(`Frame ${this.indexOf(frame)} is not an instance of Frame`);
            if (frame.width !== this.width) throw new Error('Frames have different widths');
            if (frame.height !== this.height) throw new Error('Frames have different heights');
        }
        if (loopCount < -1 || isNaN(loopCount)) throw new RangeError('Invalid loop count');
        this.loopCount = loopCount;
    }
    toString() {
        return `GIF<${this.width}x${this.height}x${this.duration}ms>`;
    }
    get duration() {
        return [
            ...this
        ].reduce((acc, frame1)=>acc + frame1.duration
        , 0);
    }
    async encode(quality = 10) {
        const encoder = await GIFEncoder.initialize(this.width, this.height, this.loopCount);
        for (const frame1 of this){
            if (!(frame1 instanceof Frame)) throw new Error('GIF contains invalid frames');
            encoder.add(~~(frame1.duration / 10), quality, frame1.bitmap);
        }
        const encoded = encoder.buffer();
        encoder.free();
        return encoded;
    }
}

