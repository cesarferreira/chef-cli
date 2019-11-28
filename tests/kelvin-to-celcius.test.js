import test from "ava";
import cnv from "../recipes/kelvin-to-celcius"
        
test("Kelvin to Celcius test", t => {
    t.is(cnv.execute(0), -273.15, "Should convert absolute zero accurately");
    t.is(cnv.execute(273.15), 0, "Should return 0 celcius for -273.15 K")
    t.is(cnv.execute(453.84), 180.69, "Should convert real numbers accurately")
});