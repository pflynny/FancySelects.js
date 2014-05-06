FancySelects.js
===============

You want a custom select and dropdown? Ain't no thang.

If the select group contains optgroups these will be wrapped in their own div, this can be used to make a mega menu style dropdown.
It will also parse a optgroup label, outputting a header. Handy.

##Requirements
jQuery 1.10

##Usage
Add this data attribute to any select you'd like to pretify.
```html
<select label="course-location" data-select-menu-source>
```

Add custom classes to hang your CSS from
```html
<select label="course-location" data-select-menu-source data-select-menu-class='some-custom-class'>
```

Add a custom title
```html
<select label="course-location" data-select-menu-source data-select-menu-title="Find a course near you">
```

### Select
```html
<select label="course-location" data-select-menu-source data-select-menu-class='wide'>
    <optgroup label="North Island">
        <option selected="selected" value="55">Northland</option>
        <option value="60">Auckland Region</option>
        <option value="17">Taranaki</option>
        <option value="5">Bay of Plenty</option>
        <option value="56">Manawatu / Whanganui</option>
        <option value="62">Manawatu / Wanganui</option>
        <option value="7">Rotorua</option>
        <option value="11">Gisborne</option>
        <option value="13">Hawkes Bay</option>
        <option value="21">Wairarapa</option>
        <option value="9">Waikato</option>
        <option value="63">Wellington Region</option>
    </optgroup>
    <optgroup label="South Island">
        <option value="33">Nelson</option>
        <option value="61">South Canterbury</option>
        <option value="53">North Canterbury</option>
        <option value="52">Central Otago</option>
        <option value="43">Otago</option>
        <option value="57">Marlborough</option>
        <option value="37">West Coast</option>
        <option value="45">Southland</option>
    </optgroup>
</select>
```
