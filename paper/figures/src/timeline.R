library(ggplot2)
library(dplyr)
library(lubridate)

# Read and preprocess data
data <- read.csv("./paper/figures/src/data.csv", sep = ",") %>%
  filter(cardID != "seeding") %>%
  mutate(createdAt = as.POSIXct(createdAt / 1000, origin = "1970-01-01"))

# Define colors
party_colors <- c("CDU" = "#000000", "AFD" = "#0000ff", "SPD" = "#ff0000", 
                  "GRUENE" = "#008000", "BSW" = "#7b2450", "FDP" = "#ffff00", 
                  "LINKE" = "#ff00ff", "FW" = "#f59a00", "SONSTIGE" = "#c0c0c0")

# Plot timeline with all points on the same y-axis level
ggplot(data, aes(x = createdAt, y = 0, color = party)) +
  geom_jitter(height = .1, size = 3) +  # Add jitter to prevent overlap
  scale_color_manual(values = party_colors) +
  labs(title = "Timeline registrierter Abstimmungen", x = "Zeit", y = NULL) +
  theme_minimal() +
  theme(
      axis.text.y = element_blank(),  # Remove y-axis text

  )
