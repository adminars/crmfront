<template>
  <div>
    <v-btn @click="showForm=!showForm">案件作成</v-btn>
    <div v-if="showForm">
      <v-form ref="form">
        <v-text-field label="着信番号" required></v-text-field>
        <v-btn>ネット割引</v-btn>
        <v-btn>カード希望</v-btn>
        <v-btn>金額未案内</v-btn>
        <v-btn>目視調査無料</v-btn>
        <v-textarea name="input-7-1" filled label="内容" auto-grow rows="10"></v-textarea>
        <v-autocomplete
          v-model="friends"
          :items="fieldsData"
          filled
          chips
          color="blue-grey lighten-2"
          label="分野選択してください"
          item-text="name"
          item-value="name"
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
              @click:close="remove(data.item)"
            >{{ data.item.name }}</v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <!--
        <v-autocomplete
          v-model="friends"
          :items="partners"
          filled
          chips
          color="blue-grey lighten-2"
          label="分野選択してください"
          item-text="store_name"
          item-value="store_name"
          return-object
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
              @click:close="remove(data.item)"
            >{{ data.item.store_name }}</v-chip>
          </template>
          <template v-slot:item="data">
            <template>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.store_name"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>-->
        <!-- <v-autocomplete
          v-model="createAnken.dial_no"
          :items="dial"
          filled
          chips
          color="blue-grey lighten-2"
          label="屋号"
          item-text="number"
          item-value="ads"
          return-object
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
              @click:close="remove(data.item)"
            >{{ data.item.number }}</v-chip>
          </template>
          <template v-slot:item="data">
            <template>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.number"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>-->
        <span>
          <!-- <v-select
            v-model="createAnken.gender"
            :items="gender"
            item-text="name"
            item-value="id"
            label="年齢・性別"
            persistent-hint
            return-object
            single-line
          ></v-select>-->
        </span>
        <span>
          <!-- <v-select
            v-model="createAnken.gender"
            :items="gender"
            item-text="name"
            item-value="id"
            label="年齢・性別"
            persistent-hint
            return-object
            single-line
          ></v-select>-->
        </span>
        <v-text-field label="会社名" required></v-text-field>
        <v-textarea name="input-7-1" filled label="パートナー連絡事項" auto-grow rows="10"></v-textarea>
        <v-text-field label="ステータス" required></v-text-field>
        <v-text-field label="ステータス" required></v-text-field>

        <div>
          <v-col>
            <v-btn>show more</v-btn>
          </v-col>
          <v-col>
            <v-text-field label="会社名" required></v-text-field>
            <v-text-field label="かける電話番号２" required></v-text-field>
            <v-text-field label="FAX" required></v-text-field>
          </v-col>
        </div>
        <v-btn>登録</v-btn>
        <v-btn>一時保存</v-btn>
      </v-form>
    </div>
  </div>
  <!-- <v-container v-if="showFrom" class="grey lighten-5 align-center">
    <v-form ref="form">
      <v-text-field v-model="item.tel_number" label="着信番号" required></v-text-field>
      <v-btn @click="netnam">ネット割引</v-btn>
      <v-btn @click="cardKibo">カード希望</v-btn>
      <v-btn @click="bankKibo">金額未案内</v-btn>
      <v-btn @click="inspectionKibo">目視調査無料</v-btn>
      <v-textarea v-model="textArea" name="input-7-1" filled label="内容" auto-grow rows="10"></v-textarea>
      <v-autocomplete
        v-model="friends"
        :items="fieldsData"
        filled
        chips
        color="blue-grey lighten-2"
        label="分野選択してください"
        item-text="name"
        item-value="name"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            @click="data.select"
            @click:close="remove(data.item)"
          >{{ data.item.name }}</v-chip>
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
      <v-autocomplete
        v-model="friends"
        :items="partners"
        filled
        chips
        color="blue-grey lighten-2"
        label="分野選択してください"
        item-text="store_name"
        item-value="store_name"
        return-object
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            @click="data.select"
            @click:close="remove(data.item)"
          >{{ data.item.store_name }}</v-chip>
        </template>
        <template v-slot:item="data">
          <template>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.store_name"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
      <v-autocomplete
        v-model="createAnken.dial_no"
        :items="dial"
        filled
        chips
        color="blue-grey lighten-2"
        label="屋号"
        item-text="number"
        item-value="ads"
        return-object
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            @click="data.select"
            @click:close="remove(data.item)"
          >{{ data.item.number }}</v-chip>
        </template>
        <template v-slot:item="data">
          <template>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.number"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
      <span>
        <v-select
          v-model="createAnken.gender"
          :items="gender"
          item-text="name"
          item-value="id"
          label="年齢・性別"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </span>
      <span>
        <v-select
          v-model="createAnken.gender"
          :items="gender"
          item-text="name"
          item-value="id"
          label="年齢・性別"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </span>
      <v-text-field v-model="createAnken.company_name" label="会社名" required></v-text-field>
      <v-textarea
        v-model="createAnken.partnerNote"
        name="input-7-1"
        filled
        label="パートナー連絡事項"
        auto-grow
        rows="10"
      ></v-textarea>
      <v-text-field v-model="createAnken.company_name" label="ステータス" required></v-text-field>
      <v-text-field v-model="createAnken.company_name" label="ステータス" required></v-text-field>

      <div>
        <v-col>
          <v-btn @click="createMore=!createMore">show more</v-btn>
        </v-col>
        <v-col v-if="createMore">
          <v-text-field v-model="createAnken.company_name" label="会社名" required></v-text-field>
          <v-text-field v-model="createAnken.call2" label="かける電話番号２" required></v-text-field>
          <v-text-field v-model="createAnken.fax" label="FAX" required></v-text-field>
        </v-col>
      </div>
      <v-btn @click="check">登録</v-btn>
      <v-btn @click="check">一時保存</v-btn>
    </v-form>
  </v-container>-->
</template>
<script>
export default {
  data() {
    return {
      form: {
        dial_no: "",
        naiyo: "",
        fieldData: "",
        partnerNote: ""
      },
      showForm: false,
      fieldsData: [
        { id: 1, name: "鍵", alias: "K" },
        { id: 2, name: "水まわり", alias: "W" },
        { id: 3, name: "ガラス", alias: "G" },
        { id: 4, name: "パソコン", alias: "P" },
        { id: 5, name: "電気工事", alias: "D" },
        { id: 6, name: "内装", alias: "R" },
        { id: 7, name: "ハウスクリーニング", alias: "H" },
        { id: 8, name: "害虫駆除", alias: "M" },
        { id: 9, name: "屋根", alias: "Y" },
        { id: 10, name: "庭", alias: "N" },
        { id: 11, name: "エアコン", alias: "A" },
        { id: 12, name: "リノベ", alias: "R" },
        { id: 13, name: "ペット葬儀", alias: "S" },
        { id: 14, name: "盗聴器発見", alias: "T" },
        { id: 15, name: "家電", alias: "X" }
      ],
      autoUpdate: true,
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      name: "Midnight Crew",
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "ひらがな",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ],
      filters: [
        {
          value: 0,
          fn: (item, queryText, itemText) => item.indexOf(queryText) > -1,
          text: "Exact Match"
        },
        {
          value: 1,
          fn: (item, queryText, itemText) =>
            queryText.length > 2 && item.toLowerCase().indexOf(queryText) > -1,
          text: "Search Length > 2 & Loose Match"
        }
      ]
    };
  }
};
</script>
