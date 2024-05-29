import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  ScrollView,
  Animated,
  Appearance,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Text, View } from "@/components/Themed";
import Icon from "@expo/vector-icons/FontAwesome";
import AnimatedLink from "@/components/AnimatedLink";
import { Modal, icon } from "@/components/CSSStyle";

export default function ModalScreen() {
  const [iconScale] = useState(new Animated.Value(1));
  const [activeSections, setActiveSections] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const toggleSection = (section: number) => {
    const newSections = activeSections.map((sectionState, i) =>
      i === section ? !sectionState : sectionState
    );
    setActiveSections(newSections);
  };

  const getIconName = (isOpen: boolean) =>
    isOpen ? "chevron-up" : "chevron-down";

  const colorScheme = Appearance.getColorScheme();

  return (
    <ScrollView contentContainerStyle={Modal.container}>
      <Text style={Modal.title}>Information</Text>
      <View style={Modal.separator} />

      <TouchableOpacity
        style={Modal.accordionHeader}
        onPress={() => toggleSection(0)}
      >
        <Text style={Modal.accordionTitle}>About Me</Text>
        <Icon name={getIconName(activeSections[0])} size={20} color={icon()} />
      </TouchableOpacity>
      <Collapsible collapsed={!activeSections[0]}>
        <View style={[Modal.accordionContent, { overflow: "hidden" }]}>
          <Text style={Modal.content}>My name is Innocent Peter (Ip)</Text>
          {/* An animinated image from assets/image/pb95fftv.png with a zoom effect */}
          {/* fix image on the screen */}
          <Animated.Image
            source={require("../assets/images/pb95fftv.png")}
            style={{
              margin: 0,
              padding: 0,
              width: "100%",
              height: "60%",
              objectFit: "scale-down",
            }}
          />

          <Text style={Modal.content}>
            I'm a full-stack JavaScript developer with experience in TypeScript,
            Python, and PHP.
          </Text>

          <Text style={Modal.content}>
            I specialize in using Nuxt.js for Vue.js, Next.js for React, Djongo
            for Python, and Laravel for PHP.
          </Text>

          <Text style={Modal.content}>
            I'm passionate about creating robust and scalable web applications.
          </Text>
          <Text style={Modal.content}>
            I also enjoy creating tools like this.
          </Text>
        </View>
      </Collapsible>

      <TouchableOpacity
        style={Modal.accordionHeader}
        onPress={() => toggleSection(1)}
      >
        <Text style={Modal.accordionTitle}>How to Calculate GPA</Text>
        <Icon name={getIconName(activeSections[1])} size={20} color={icon()} />
      </TouchableOpacity>
      <Collapsible collapsed={!activeSections[1]}>
        <View style={Modal.accordionContent}>
          <Text style={Modal.content}>
            This is how to calculate GPA content...
          </Text>

          {/* Text decription of how GPA is benn calculated */}
          <Text style={Modal.content}>
            GPA (Grade Point Average) is a numerical representation of a
            student's academic performance, typically calculated at the end of
            each semester or academic year. It provides a standardized way to
            measure and compare academic achievements across different courses
            and programs.
          </Text>

          <Text style={Modal.content}>
            To calculate GPA, you need to consider two key factors: Grade Points
            and Course Credits.
          </Text>

          <Text style={Modal.content}>
            Grade Points: Each letter grade is assigned a numerical value called
            a grade point. A common scale is:
          </Text>

          <View
            style={[
              Modal.content,
              { margin: 20, backgroundColor: "tranceparent" },
            ]}
          >
            <Text style={Modal.content}>A = 5 grade points</Text>
            <Text style={Modal.content}>B = 4 grade points</Text>
            <Text style={Modal.content}>C = 3 grade points</Text>
            <Text style={Modal.content}>D = 2 grade point</Text>
            <Text style={Modal.content}>E = 1 grade point</Text>
            <Text style={[{ fontSize: 10, color: "green", margin: 0 }]}>
              For schools that use the E
            </Text>
            <Text style={Modal.content}>F = 0 grade points</Text>
          </View>

          <Text style={Modal.content}>
            Course Credits: Each course has a certain number of credits assigned
            to it, typically based on the course's workload and the number of
            hours spent in class per week.
          </Text>
          <Text style={Modal.content}>
            To calculate the GPA for a single semester or academic session:
          </Text>
          <View
            style={[
              Modal.content,
              { margin: 20, backgroundColor: "tranceparent" },
            ]}
          >
            <Text style={Modal.content}>
              1. For each course taken, multiply the grade point value by the
              number of credits for that course. This gives you the total grade
              points earned for that course.
            </Text>
            <Text style={Modal.content}>
              2. Add up the total grade points earned for all courses taken
              during that term.
            </Text>
            <Text style={Modal.content}>
              3. Add up the total number of credits attempted (the sum of
              credits for all courses taken, including those with failing
              grades).
            </Text>
            <Text style={Modal.content}>
              4. Divide the total grade points earned by the total credits
              attempted.
            </Text>
          </View>
          <Text style={Modal.content}>
            The resulting number is your GPA for that semaster, typically
            represented on a 4.0 scale. A GPA above 4.0 is possible if the
            institution uses a different grading scale or includes additional
            weight for honors or advanced courses.
          </Text>
          <Text style={Modal.content}>
            Calculating GPA is essential for evaluating academic performance,
            determining eligibility for academic honors or scholarships, and
            making decisions about academic standing or progression.
          </Text>
        </View>
      </Collapsible>

      <TouchableOpacity
        style={Modal.accordionHeader}
        onPress={() => toggleSection(2)}
      >
        <Text style={Modal.accordionTitle}>How to Calculate CGPA</Text>
        <Icon name={getIconName(activeSections[2])} size={20} color={icon()} />
      </TouchableOpacity>
      <Collapsible collapsed={!activeSections[2]}>
        <View style={Modal.accordionContent}>
          <Text style={[Modal.content, { fontWeight: 900 }]}>
            This is how to calculate CGPA (Cumulative Grade Point Average).
          </Text>
          <Text style={Modal.content}>
            To calculate your CGPA the easy way.{"\n"}
            You need to get the sum of all your GPAs and divide it by the total
            number of years you studied. For example, if your program duration
            is 5 years and the sum of your GPAs for all 5 years is 20.5, then
            your CGPA will be calculated as follows:
          </Text>
          <Text style={Modal.content}>
            CGPA = Sum of GPAs / Total Number of Years
          </Text>
          <Text style={Modal.content}>CGPA = 20.5 / 5 = 4.1</Text>
        </View>
      </Collapsible>

      <View
        style={Modal.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Text style={Modal.title}>Follow Me</Text>
      <View style={Modal.socialMedia}>
        <AnimatedLink
          href={"https://twitter.com/innocenpeter?s=09"}
          style={Modal.iconContainer}
        >
          <Icon name="twitter" size={30} color="#1DA1F2" />
        </AnimatedLink>

        <AnimatedLink
          href={
            "https://www.linkedin.com/in/peter-innocent?utm_source=share&utm_campaign=share_via&utm_content=profile"
          }
          style={Modal.iconContainer}
        >
          <Icon name="linkedin" size={30} color="#0A66C2" />
        </AnimatedLink>

        <AnimatedLink
          href={"https://github.com/Ip-Tec"}
          style={Modal.iconContainer}
        >
          <Icon
            name="github"
            size={30}
            color={colorScheme === "light" ?  "#fff" : "#000"}
          />
        </AnimatedLink>
      </View>

      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
    </ScrollView>
  );
}
