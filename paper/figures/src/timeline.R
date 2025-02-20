library(ggplot2)
library(dplyr)
library(forcats)
library(lubridate)  # For handling timestamps


# Read the data
data <- read.csv("./paper/figures/src/data.csv", header = TRUE, sep = ",")

# Convert timestamps to datetime format & filter out "seeding"
df_filtered <- data %>%
  filter(cardID != "seeding") %>%
  mutate(createdAt = as.POSIXct(createdAt / 1000, origin = "1970-01-01"))

# Define the color mapping
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

# Create the timeline plot
ggplot(df_filtered, aes(x = createdAt, y = party, color = party)) +
  geom_point(size = 3) +  # Plot points
  scale_color_manual(values = party_colors) +  # Apply custom colors
  labs(title = "Timeline", x = "Time", y = "Partei") + 
  theme(legend.position = "none")
