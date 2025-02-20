library(ggplot2)
library(dplyr)
library(forcats)

data <- read.csv("./paper/figures/src/data.csv", header = TRUE, sep = ",")

party_colors <- c(
  "CDU" = "#000000",
  "AFD" = "#0000ff",
  "SPD" = "#ff0000",
  "GRUENE" = "#008000",
  "BSW" = "#7b2450",
  "FDP" = "#ffff00",
  "LINKE" = "#ff00ff",
  "FW" = "#f59a00",
  "SONSTIGE" = "#c0c0c0"
)


# Filter out rows where cardID == "seeding"
df_filtered <- data %>%
  filter(cardID != "seeding")

df_count <- df_filtered %>%
  group_by(party) %>%
  summarise(count = n()) %>%
  arrange(desc(count))

# Create the bar plot with sorted counts and specified colors
ggplot(df_count, aes(x = fct_reorder(party, count, .desc = TRUE), y = count, fill = party)) +
  geom_bar(stat = "identity") +
  scale_fill_manual(values = party_colors) +  # Apply custom colors
  labs(title = "Ergebnis ohne Seed-Daten", x = "Partei", y = "Anzahl")+ theme(legend.position = "none")
