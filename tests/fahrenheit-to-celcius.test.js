import test from "ava";
import cnv from "../recipes/fahrenheit-to-celcius"
        
test("Fahrenheit to Celcius test", t => {
    t.is(cnv.execute(96.8), 36, "Should convert values accurately")
    t.is(cnv.execute(-58), -50, "Should convert negative numbers accurately")
});